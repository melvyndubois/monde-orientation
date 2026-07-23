/* ═══════════════════════════════════════════════════════════════
   Monde. — Proxy backend sécurisé pour l'API Anthropic
   Livrable Lot 3 (ET-1 du cahier des charges)

   Rôle : garder la clé API CÔTÉ SERVEUR (jamais dans le navigateur)
   et relayer les requêtes d'analyse vers l'API Anthropic.

   Zéro dépendance externe : Node >= 18 (fetch natif) suffit.
   Lancement : ANTHROPIC_API_KEY=sk-ant-... node server/server.js

   RGPD (EJ-3) : ce proxy NE LOGGE PAS le contenu des requêtes
   (signaux, prompts). Seuls des métriques anonymes sont tracées.
   ═══════════════════════════════════════════════════════════════ */

'use strict';
const http = require('http');

// ─── Configuration (via variables d'environnement) ───────────────
const PORT          = process.env.PORT || 8787;
const API_KEY       = process.env.ANTHROPIC_API_KEY || '';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VER = '2023-06-01';
const MAX_BODY      = 256 * 1024;               // 256 Ko : les signaux sont petits
const MAX_TOKENS    = 8000;
const ALLOWED_MODELS = new Set([
  'claude-sonnet-5', 'claude-opus-4-8', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001',
]);
// Origines autorisées (CORS). '*' seulement pour le dev local.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*')
  .split(',').map(s => s.trim()).filter(Boolean);

if (!API_KEY) {
  console.error('⚠️  ANTHROPIC_API_KEY manquante. Définis-la avant de lancer le serveur.');
  console.error('    Exemple : ANTHROPIC_API_KEY=sk-ant-... node server/server.js');
  process.exit(1);
}

// ─── Rate limiting mémoire simple (par IP) ───────────────────────
const RL_WINDOW = 60 * 1000, RL_MAX = 20;       // 20 requêtes / minute / IP
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, reset: now + RL_WINDOW };
  if (now > rec.reset) { rec.count = 0; rec.reset = now + RL_WINDOW; }
  rec.count++; hits.set(ip, rec);
  return rec.count > RL_MAX;
}

// ─── Helpers ─────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes('*') ? '*'
    : (ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0] || '');
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}
function send(res, status, obj, extra = {}) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...extra });
  res.end(body);
}

// ─── Serveur ─────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  const cors = corsHeaders(origin);
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();

  // Préflight CORS
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }

  // Healthcheck (aucune donnée)
  if (req.method === 'GET' && req.url === '/health') {
    return send(res, 200, { status: 'ok', service: 'monde-proxy', ts: new Date().toISOString() }, cors);
  }

  if (req.method !== 'POST' || req.url !== '/api/analyze') {
    return send(res, 404, { error: 'Not found' }, cors);
  }
  if (rateLimited(ip)) {
    return send(res, 429, { error: 'Trop de requêtes. Réessaie dans une minute.' }, cors);
  }

  // Lecture du corps avec limite de taille
  let raw = '', tooBig = false;
  req.on('data', chunk => {
    raw += chunk;
    if (raw.length > MAX_BODY) { tooBig = true; req.destroy(); }
  });
  req.on('end', async () => {
    if (tooBig) return send(res, 413, { error: 'Requête trop volumineuse.' }, cors);
    let payload;
    try { payload = JSON.parse(raw); }
    catch { return send(res, 400, { error: 'JSON invalide.' }, cors); }

    // Validation minimale
    const { system, messages } = payload;
    let { model, max_tokens } = payload;
    if (typeof system !== 'string' || !Array.isArray(messages) || !messages.length) {
      return send(res, 400, { error: 'Champs requis : system (string), messages (array).' }, cors);
    }
    if (!ALLOWED_MODELS.has(model)) model = 'claude-sonnet-5';
    max_tokens = Math.min(Number(max_tokens) || MAX_TOKENS, MAX_TOKENS);

    // Métrique anonyme (aucun contenu)
    console.log(`[${new Date().toISOString()}] analyze model=${model} sys=${system.length}c msgs=${messages.length}`);

    try {
      const upstream = await fetch(ANTHROPIC_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': ANTHROPIC_VER,
        },
        body: JSON.stringify({ model, max_tokens, system, messages, thinking: { type: 'disabled' } }),
      });
      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        const msg = data?.error?.message || `Erreur API (${upstream.status})`;
        return send(res, upstream.status, { error: msg }, cors);
      }
      // On ne renvoie que le texte utile
      const text = data?.content?.[0]?.text ?? '';
      return send(res, 200, { text }, cors);
    } catch (err) {
      return send(res, 502, { error: 'Impossible de joindre l\'API Anthropic : ' + (err.message || 'inconnue') }, cors);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✓ Monde. proxy en écoute sur http://localhost:${PORT}`);
  console.log(`  Endpoints : POST /api/analyze · GET /health`);
  console.log(`  Origines autorisées : ${ALLOWED_ORIGINS.join(', ')}`);
});
