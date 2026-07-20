# Proxy backend Monde.
*Livrable Lot 3 (ET-1 du cahier des charges) — sécurisation de la clé API*

Petit serveur qui garde la clé API Anthropic **côté serveur** et relaie les requêtes d'analyse. Il remplace l'appel direct navigateur → Anthropic du pilote, qui exposait la clé.

## Lancer

Node >= 18 requis (utilise `fetch` natif — **aucune dépendance à installer**).

```bash
# Depuis le dossier server/
export ANTHROPIC_API_KEY=sk-ant-api03-...      # PowerShell : $env:ANTHROPIC_API_KEY="sk-ant-..."
node server.js
# → http://localhost:8787
```

Vérifier :
```bash
curl http://localhost:8787/health
```

## Brancher le front

Dans `findyourself-v1/index.html`, renseigner la constante :
```js
const BACKEND_URL = 'http://localhost:8787';   // vide = mode pilote (clé dans le navigateur)
```
Quand `BACKEND_URL` est défini, l'app poste sur `/api/analyze` **sans** clé API (le champ clé disparaît du formulaire). Quand il est vide, on retombe sur le comportement pilote (clé saisie dans le navigateur).

## Endpoints

| Méthode | Chemin | Corps | Réponse |
|---|---|---|---|
| `GET` | `/health` | — | `{status:"ok"}` |
| `POST` | `/api/analyze` | `{ system, messages, model?, max_tokens? }` | `{ text }` (le texte JSON du rapport) |

## Sécurité et RGPD

- **Clé jamais exposée** au client (ET-1).
- **Pas de log de contenu** (EJ-3) : seules des métriques anonymes (modèle, tailles) sont tracées, jamais les signaux ni les prompts.
- **CORS** restreint via `ALLOWED_ORIGINS` (mettre les domaines réels en production).
- **Rate limiting** mémoire : 20 requêtes/min/IP.
- **Limite de taille** de requête : 256 Ko (les signaux extraits sont petits ; l'export brut ne doit jamais transiter).
- **Modèles en allowlist** ; `max_tokens` plafonné.

## Durcissement recommandé (prochaine étape)

Aujourd'hui le proxy **relaie** le `system` prompt envoyé par le front. Pour un durcissement complet (le serveur maîtrise entièrement le prompt et le référentiel), déplacer la construction du prompt (`buildSystemPrompt`/`buildUserPrompt`) côté serveur et n'accepter du client que `{ formData, signaux }`. Documenté comme évolution ET-2 ; non fait ici pour éviter de dupliquer la logique du référentiel pendant la phase pilote.
