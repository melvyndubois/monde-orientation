/* ═══════════════════════════════════════════════════════════════
   Monde. — Fonction serverless Vercel : proxy sécurisé Anthropic
   Équivalent de netlify/functions/analyze.js, au format Vercel.
   Timeout porté à 60 s via vercel.json (Netlify gratuit était à 10 s).

   Variables d'environnement Vercel attendues :
   - ANTHROPIC_API_KEY (ou `key` / `KEY`) : la clé, côté serveur.
   - ACCESS_CODE (optionnel) : code d'accès conseiller.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const ANTHROPIC_URL  = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VER  = '2023-06-01';
const MAX_TOKENS     = 8000;
const ALLOWED_MODELS = new Set([
  'claude-sonnet-5', 'claude-opus-4-8', 'claude-sonnet-4-6', 'claude-haiku-4-5', 'claude-haiku-4-5-20251001',
]);

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Méthode non autorisée.' });

  // Accepte le nom recommandé ANTHROPIC_API_KEY, ou le nom générique "key"/"KEY".
  const API_KEY     = process.env.ANTHROPIC_API_KEY || process.env.key || process.env.KEY || '';
  const ACCESS_CODE = process.env.ACCESS_CODE || '';
  if (!API_KEY) return res.status(500).json({ error: 'Configuration serveur incomplète (clé API manquante).' });

  // Code d'accès conseiller (si configuré) — décodé (accents transportés encodés)
  if (ACCESS_CODE.trim()) {
    const rawHeader = req.headers['x-access-code'] || '';
    let provided = rawHeader;
    try { provided = decodeURIComponent(rawHeader); } catch { /* en-tête non encodé */ }
    if (provided.trim() !== ACCESS_CODE.trim()) {
      return res.status(401).json({ error: "Code d'accès requis ou invalide. Vérifie le champ « Code d'accès »." });
    }
  }

  // Vercel parse déjà le JSON quand Content-Type = application/json ;
  // on gère aussi le cas d'un corps brut par sécurité.
  let payload = req.body;
  if (typeof payload === 'string') { try { payload = JSON.parse(payload); } catch { payload = {}; } }
  payload = payload || {};

  const { system, messages } = payload;
  let { model, max_tokens } = payload;
  if (typeof system !== 'string' || !Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: 'Champs requis : system (string), messages (array).' });
  }
  if (!ALLOWED_MODELS.has(model)) model = 'claude-sonnet-5';
  max_tokens = Math.min(Number(max_tokens) || MAX_TOKENS, MAX_TOKENS);

  // Métrique anonyme uniquement (aucun contenu)
  console.log(`analyze model=${model} sys=${system.length}c msgs=${messages.length}`);

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': ANTHROPIC_VER,
      },
      // thinking désactivé : la tâche est une extraction JSON structurée,
      // la réflexion interne (adaptive) ne fait que ralentir → timeouts.
      body: JSON.stringify({ model, max_tokens, system, messages, thinking: { type: 'disabled' } }),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data?.error?.message || `Erreur API (${upstream.status})` });
    }
    return res.status(200).json({ text: data?.content?.[0]?.text ?? '' });
  } catch (err) {
    return res.status(502).json({ error: "Impossible de joindre l'API Anthropic : " + (err.message || 'inconnue') });
  }
};
