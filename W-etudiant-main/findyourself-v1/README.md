# FindYourself — v2 Test Pilote

Outil d'orientation professionnelle (jeunes 14-25 ans et adultes en reconversion) qui analyse les données comportementales exportées depuis TikTok ou Instagram pour identifier un **domaine** (l'univers qui passionne la personne), puis proposer des **portes d'entrée** métiers — via IA, adossé au référentiel domaines/métiers v1.1 (RIASEC, ROME).

**Principes v2 (issus du cahier des charges) :**
- **Hypothèses, jamais verdicts** : aucun score chiffré, aucun % de match. Des niveaux qualitatifs (fort/moyen/faible) toujours justifiés par une preuve comportementale, et des questions de conversation.
- **La fenêtre, pas le miroir** : au moins une piste par rapport est un métier absent du feed (badge "Fenêtre"), pour contrer la bulle algorithmique et la reproduction sociale.
- **Garde-fous anti-biais** dans le prompt : le feed ≠ la personne, distinction intérêt/aptitude/adéquation, vigilance genre/classe, angles morts et inférences risquées documentés pour le conseiller.
- **Situation de formation granulaire** (SEGPA, spécialités, filière techno, secteur CAP/Bac pro, parcours adulte→CPF) + auto-évaluation des compétences.

---

## Lancer le projet

Ouvrir `index.html` dans un navigateur. **Aucune installation requise.**

> Pour le mode démo ou les fonctionnalités d'import de fichier local, certains navigateurs bloquent les requêtes `fetch` sur `file://`. Si la démo ne charge pas le fichier automatiquement, les données inline de secours prennent le relais.
>
> Pour éviter ce problème, lance un mini-serveur local :
> ```bash
> # Python 3
> python -m http.server 8080
> # puis ouvre http://localhost:8080
> ```

---

## Utiliser la démo

1. Cliquer **"Voir la démo"** sur l'écran d'accueil
2. Le formulaire se pré-remplit automatiquement avec le profil de Tony (16 ans, 2nde)
3. Les données de `demo-data/tony_demo.json` sont chargées
4. Saisir une clé API Anthropic et cliquer **"Analyser mon profil →"**

---

## Utiliser avec de vraies données

### TikTok
1. Aller dans **Profil → ⋮ → Confidentialité → Télécharger tes données**
2. Sélectionner le format **JSON** (pas TXT)
3. Délai d'export : environ 3 à 7 jours
4. Déposer le fichier `user_data.json` dans l'app

### Instagram
1. Aller dans **Paramètres → Tes activités → Télécharger tes informations**
2. Sélectionner le format **JSON**
3. Déposer le `.zip` ou le fichier `your_topics.json` extrait dans l'app

---

## Clé API Anthropic

L'app appelle l'API Anthropic directement depuis le navigateur.

- Obtenir une clé : https://console.anthropic.com
- La clé commence par `sk-ant-api03-…`
- Pour le pilote interne, tu peux pré-remplir la constante `PREFILLED_KEY` dans `index.html` (ligne ~430 du JS)

> ⚠️ **En production**, cette clé doit être sécurisée via un proxy backend. Pour le pilote (usage interne uniquement), la clé peut être embarquée dans le code.

### Mode production (proxy backend) — recommandé hors pilote

Le proxy `server/` garde la clé côté serveur. Pour l'activer, renseigner dans `index.html` :
```js
const BACKEND_URL = 'http://localhost:8787';   // vide = mode pilote (clé navigateur)
```
Quand il est défini, le champ « Clé API » disparaît et l'app appelle le proxy sans clé. Lancer le serveur : voir `server/README.md`.

### Modèle utilisé

La constante `CLAUDE_MODEL` (en haut du JS dans `index.html`) définit le modèle. Par défaut : `claude-sonnet-5`. Consulte [la liste des modèles disponibles](https://docs.anthropic.com/en/docs/about-claude/models) pour utiliser la dernière version.

---

## Architecture

```
findyourself-v1/
├── index.html              ← App complète auto-contenue (HTML/CSS/JS vanilla)
├── referentiel.js          ← Référentiel domaines/métiers v1.1 (GÉNÉRÉ — ne pas éditer)
├── loading-phrases.js      ← Phrases d'attente pendant l'analyse
├── demo-data/
│   └── tony_demo.json      ← Données de démo simulées (export TikTok)
└── README.md
```

### Le référentiel

`referentiel.js` est **généré** depuis `Data/referentiel_domaines_metiers_v1-1.json` (la source de vérité). Pour le mettre à jour, modifier le JSON source puis régénérer :

```bash
node -e "const fs=require('fs');const j=fs.readFileSync('Data/referentiel_domaines_metiers_v1-1.json','utf8');JSON.parse(j);fs.writeFileSync('W-etudiant-main/findyourself-v1/referentiel.js','window.REFERENTIEL = '+j.trim()+';\n')"
```

Le prompt système est construit dynamiquement (`buildSystemPrompt()` dans `index.html`) : il condense le référentiel (univers, domaines précis, facettes, portes d'entrée, portes farfelues) et y ajoute les règles d'interprétation et les garde-fous anti-biais. La réponse IA suit un schéma JSON sans aucun score numérique (`domaine`, `facettes`, `hypotheses`, `pistes`, `conseiller.angles_morts`, `conseiller.inferences_risquees`).

**Pas de framework, pas de build, pas de backend.** Déploiement sur Netlify ou GitHub Pages en glisser-déposer.

---

## Déploiement

### Netlify (recommandé)
1. Aller sur https://app.netlify.com
2. "Add new site → Deploy manually"
3. Glisser le dossier `findyourself-v1/` dans la zone de dépôt
4. L'URL est disponible instantanément

### GitHub Pages
1. Créer un repo, pousser le dossier
2. Settings → Pages → Source : `main` / `root`

---

## Confidentialité

- **Aucune donnée envoyée à un serveur FindYourself**
- Les données transitent uniquement vers l'API Anthropic pour l'analyse
- Aucune donnée n'est conservée après la session (pas de cookies, pas de localStorage)
- Ce point doit être expliqué aux jeunes et aux conseillers avant utilisation

---

## Contact & pilote

**Clément Gal** — clement.gal.pro@gmail.com

Pour toute question sur le pilote, les partenariats Missions Locales / lycées, ou l'évolution vers une v2 avec backend sécurisé.
