/* ═══════════════════════════════════════════════════════════════
   Monde. — Fonction serverless Netlify : proxy sécurisé Anthropic
   Livrable déploiement (Lot 3 en production).

   Rôle : garder la clé API CÔTÉ SERVEUR (variable d'environnement
   Netlify ANTHROPIC_API_KEY), jamais dans le navigateur.

   Protections :
   - Clé jamais exposée au client.
   - Code d'accès conseiller optionnel (env ACCESS_CODE) : si défini,
     seules les requêtes avec le bon code passent → protège le budget.
   - Modèles en allowlist, max_tokens plafonné, taille de requête limitée.
   - AUCUN log du contenu (signaux/prompts) — RGPD (minimisation).

   Le vrai garde-fou budget = la limite de dépense dans la console
   Anthropic (voir docs/deploiement.md). Ne PAS s'en remettre au code seul.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const ANTHROPIC_URL   = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VER   = '2023-06-01';
const MAX_BODY        = 256 * 1024;      // 256 Ko : les signaux sont petits
const MAX_TOKENS      = 8000;
const ALLOWED_MODELS  = new Set([
  'claude-sonnet-5', 'claude-opus-4-8', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001',
]);

function resp(statusCode, obj, extraHeaders = {}) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
    body: JSON.stringify(obj),
  };
}

exports.handler = async (event) => {
  // Même origine sur Netlify : pas de CORS à ouvrir. On refuse tout le reste.
  if (event.httpMethod === 'OPTIONS') return resp(204, {});
  if (event.httpMethod !== 'POST')    return resp(405, { error: 'Méthode non autorisée.' });

  // Accepte le nom recommandé ANTHROPIC_API_KEY, ou le nom générique "key"/"KEY".
  const API_KEY     = process.env.ANTHROPIC_API_KEY || process.env.key || process.env.KEY || '';
  const ACCESS_CODE = process.env.ACCESS_CODE || '';
  if (!API_KEY) return resp(500, { error: 'Configuration serveur incomplète (clé API manquante).' });

  // Code d'accès conseiller (si configuré)
  if (ACCESS_CODE) {
    const provided = event.headers['x-access-code'] || event.headers['X-Access-Code'] || '';
    if (provided !== ACCESS_CODE) {
      return resp(401, { error: "Code d'accès requis ou invalide. Demande-le à ton administrateur." });
    }
  }

  // Taille de la requête
  const rawBody = event.body || '';
  if (rawBody.length > MAX_BODY) return resp(413, { error: 'Requête trop volumineuse.' });

  let payload;
  try { payload = JSON.parse(rawBody); }
  catch { return resp(400, { error: 'JSON invalide.' }); }

  const { system, messages } = payload;
  let { model, max_tokens } = payload;
  if (typeof system !== 'string' || !Array.isArray(messages) || !messages.length) {
    return resp(400, { error: 'Champs requis : system (string), messages (array).' });
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
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const msg = data?.error?.message || `Erreur API (${upstream.status})`;
      return resp(upstream.status, { error: msg });
    }
    return resp(200, { text: data?.content?.[0]?.text ?? '' });
  } catch (err) {
    return resp(502, { error: "Impossible de joindre l'API Anthropic : " + (err.message || 'inconnue') });
  }
};
