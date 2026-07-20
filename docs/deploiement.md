# Guide de déploiement — mettre Monde. en ligne (Netlify)
*Cible : hébergement Netlify, sous-domaine gratuit, usage via conseillers*
*Version 1.0 — Juillet 2026*

> **Ce que fait cette configuration.** Le site (l'app) est servi en HTTPS par Netlify. La clé API Anthropic n'est **jamais** dans le navigateur : elle vit dans une variable d'environnement Netlify, utilisée par une petite fonction serveur (`netlify/functions/analyze.js`) qui sert de proxy. Un **code d'accès conseiller** protège l'appel à l'API payante contre les abus.

---

## AVANT DE COMMENCER — le point qui n'est pas technique

Publier un outil qui analyse les données TikTok/Instagram de **mineurs** crée des obligations RGPD réelles (détaillées dans `analyse_rgpd_pre_aipd.md`). Le choix « usage via conseillers » réduit le risque mais ne l'annule pas. **Avant d'ouvrir à de vrais bénéficiaires**, il te faut au minimum :

1. Une **notice de confidentialité** accessible depuis le site (finalité, données, destinataire Anthropic/USA, durée, droits, contact).
2. L'**avis d'un DPO** et, très probablement, une **AIPD** (analyse d'impact).
3. Idéalement, le **test Barnum** passé (`protocole_test_barnum.md`) pour ne pas déployer un outil qui ne ferait pas mieux qu'un horoscope.

Tant que ce n'est pas fait, reste en **accès restreint** (code d'accès donné à quelques conseillers de confiance, données de test/consenties). La config ci-dessous permet exactement ça.

---

## ÉTAPE 1 — Créer les comptes (gratuit)

1. **Compte Anthropic** (console.anthropic.com) si pas déjà fait → tu y récupères une **clé API** (`sk-ant-…`) et tu y règles la **limite de dépense** (étape 4, cruciale).
2. **Compte Netlify** (netlify.com) → gratuit, connexion possible via GitHub ou email.

---

## ÉTAPE 2 — Déployer le site

Deux méthodes, choisis la plus simple pour toi.

### Méthode A — via GitHub (recommandée, mises à jour automatiques)
1. Créer un dépôt GitHub et y pousser **tout le dossier** `W-etudiant-main` (celui qui contient `netlify.toml`, `netlify/`, `W-etudiant-main/findyourself-v1/`…).
   - Le fichier `.gitignore` fourni empêche déjà de committer les secrets.
2. Sur Netlify : **Add new site → Import from Git** → choisir le dépôt.
3. Netlify lit automatiquement `netlify.toml` (dossier publié + fonction). Laisser les réglages par défaut → **Deploy**.

### Méthode B — glisser-déposer (le plus rapide, sans Git)
1. Installer l'outil en ligne de commande : `npm install -g netlify-cli`
2. Depuis le dossier racine `W-etudiant-main` :
   ```bash
   netlify deploy --prod
   ```
   (Se laisser guider : login, « create & configure a new site ». Netlify utilise `netlify.toml`.)

> ⚠️ Le simple glisser-déposer d'un dossier dans l'interface web ne déploie **pas** les fonctions serverless de façon fiable. Utilise la méthode A ou la CLI (méthode B) pour que `/api/analyze` fonctionne.

---

## ÉTAPE 3 — Configurer les variables d'environnement (les secrets)

Dans Netlify : **Site configuration → Environment variables → Add**. Ajouter :

| Variable | Valeur | Rôle |
|---|---|---|
| `ANTHROPIC_API_KEY` | ta clé `sk-ant-…` | Reste côté serveur. **Ne jamais** la mettre dans le code. |
| `ACCESS_CODE` | un mot de passe que tu choisis (ex : `MISSIONS-LOCALES-2026`) | Code d'accès conseiller. Sans le bon code, l'analyse est refusée → protège ton budget. |

Puis **redéployer** (Netlify → Deploys → Trigger deploy) pour que les variables soient prises en compte.

> Donne le `ACCESS_CODE` uniquement aux conseillers autorisés. Pour le changer, modifie la variable et redéploie.

---

## ÉTAPE 4 — Plafonner la dépense Anthropic (À NE PAS SAUTER)

C'est la vraie protection financière. Dans la console Anthropic → **Billing / Limits** :
- Définir une **limite de dépense mensuelle** (ex : 20–50 € pour commencer).
- Créer une **clé API dédiée** à ce site (pour pouvoir la révoquer sans impacter autre chose).

Ainsi, même en cas d'abus, la facture ne peut pas exploser.

---

## ÉTAPE 5 — Tester

1. Ouvrir l'URL fournie par Netlify (ex : `https://ton-site.netlify.app`).
2. Cliquer **« Voir la démo »** : le rapport de démonstration s'affiche même sans API (bouton de secours) → valide que le site est bien publié.
3. Test réel : remplir le formulaire, entrer le **code d'accès**, cocher le consentement, lancer une analyse → un vrai rapport doit se générer.
4. Vérifier la sécurité : ouvre les outils développeur (F12) → onglet Réseau → l'appel part vers `/api/analyze` (ton domaine), **jamais** vers `api.anthropic.com`, et **aucune clé** n'apparaît côté navigateur.

---

## Tester en local avant de publier

```bash
npm install -g netlify-cli
cd W-etudiant-main
# fournir les secrets pour la session locale :
netlify dev
# → http://localhost:8888 (la fonction /api/analyze tourne en local)
```
Créer un fichier `.env` (non versionné) à la racine avec `ANTHROPIC_API_KEY=...` et `ACCESS_CODE=...`, ou les passer à `netlify dev`.

---

## Brancher un vrai nom de domaine (plus tard)

Quand tu voudras un domaine propre (ex : `monde-orientation.fr`) :
1. L'acheter (~10–15 €/an) chez un registrar (OVH, Gandi, Namecheap…).
2. Netlify → **Domain management → Add a domain** → suivre les instructions DNS (Netlify fournit le certificat HTTPS automatiquement).
3. Une fois le domaine actif, si tu avais restreint le CORS, penser à autoriser ce domaine (ici tout est same-origin, donc rien à changer).

---

## Récapitulatif des coûts

| Poste | Coût | Obligatoire ? |
|---|---|---|
| Hébergement Netlify (offre gratuite) | 0 € | oui — suffit pour démarrer |
| Sous-domaine `.netlify.app` | 0 € | oui (par défaut) |
| Nom de domaine propre | ~10–15 €/an | non (plus tard) |
| API Anthropic | à l'usage (~qq centimes par rapport, selon le modèle) — plafonné par ta limite | oui |
| DPO / accompagnement RGPD | variable | **oui avant ouverture réelle à des mineurs** |

---

## En cas de problème

- **L'analyse renvoie une erreur 401** : le code d'accès saisi ne correspond pas à `ACCESS_CODE`, ou tu n'en as pas saisi alors que le serveur en exige un.
- **Erreur 500 « configuration serveur incomplète »** : `ANTHROPIC_API_KEY` n'est pas définie côté Netlify (ou redéploiement oublié).
- **`/api/analyze` introuvable (404)** : le site a été déployé sans les fonctions → utiliser la méthode Git ou la CLI, pas le glisser-déposer web.
- **La page ne se met pas à jour** : vider le cache navigateur (Ctrl+Maj+R).
