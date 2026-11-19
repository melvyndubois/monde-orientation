Motif (ex-FindYourself, ex-Monde.) : dossier de passation
1. Le produit en une phrase
Outil d'orientation professionnelle pour les 14-25 ans et les adultes en reconversion. La personne dépose son export de données TikTok et/ou Instagram. L'app en extrait des signaux comportementaux (comptes suivis, sujets, recherches, favoris…) et une IA (Claude) produit un rapport d'orientation. Ce rapport sert de support à un entretien avec un conseiller (Missions Locales, lycées).

Logique centrale : « le domaine avant le métier ». L'IA trouve d'abord le domaine (« la moto », pas « la mobilité »), puis les facettes (ce que la personne aime faire, exprimé en verbes), puis seulement des portes d'entrée métiers.

Principes éthiques (non négociables, voir le cahier des charges) :

Hypothèses, jamais des verdicts : aucun score ni pourcentage. On utilise des niveaux fort/moyen/faible, toujours appuyés sur une preuve comportementale.
« La fenêtre, pas le miroir » : chaque rapport contient au moins une piste absente du feed (badge « Fenêtre »), pour ne pas enfermer la personne dans sa bulle algorithmique ni reproduire son milieu social.
Garde-fous anti-biais dans le prompt : le feed n'est pas la personne, on distingue intérêt / aptitude / adéquation, on reste vigilant sur le genre et la classe sociale.
2. Architecture technique
Pas de framework, pas d'étape de build, pas de base de données. Tout est en HTML/CSS/JS vanilla.


W-etudiant-main/                      ← racine du repo
├── W-etudiant-main/findyourself-v1/  ← L'APP (seul dossier publié)
│   ├── index.html          ← toute l'app (~3 700 lignes : HTML + CSS + JS)
│   ├── referentiel.js      ← référentiel domaines/métiers (GÉNÉRÉ)
│   ├── referentiel-cpf.js  ← formations CPF, parcours adulte (GÉNÉRÉ)
│   ├── loading-phrases.js  ← phrases affichées pendant l'analyse
│   ├── api/analyze.js      ← fonction serverless VERCEL (proxy Anthropic)
│   ├── vercel.json         ← config Vercel (timeout 300 s + en-têtes sécu/CSP)
│   ├── demo-data/tony_demo.json ← persona de démo
│   └── motif-logo.png
├── netlify/functions/analyze.js  ← même proxy, version Netlify
├── netlify.toml                  ← config Netlify
├── server/server.js              ← même proxy, version Node autonome (dev local)
├── schemas/                      ← contrats JSON entrée/sortie
├── Data/                         ← SOURCES : référentiels JSON, dossiers partenaires
├── docs/                         ← déploiement, RGPD, protocole Barnum, comité, biblio
├── outils/test-barnum.html       ← outil pour mener le test Barnum
└── CAHIER_DES_CHARGES.md         ← document de référence produit
Le parcours dans index.html
Il y a 4 écrans (showScreen()) : home → form → analysis → report.

Formulaire (#screen-form) : prénom, âge, situation de formation (SEGPA, lycée général/techno/pro, études sup, adulte…) avec un champ de précision, compétences auto-déclarées, consentement (plus un consentement parental pour les mineurs), et le code d'accès conseiller.
Ingestion des données, 100 % locale dans le navigateur :
processPlatformFile() accepte un .json ou un .zip. Le zip est lu avec JSZip (chargé depuis un CDN). Au-delà de 80 Mo, c'est processLargeZip() qui prend le relais (lecture par tranches).
Extracteurs : extraireSignaux(), extraireSignauxInstagramV2(), extraireSignauxInstagramHTML() (Instagram exporte aussi en HTML), et extraireSignauxRecursif() en dernier recours, qui parcourt tout le JSON.
fixEncoding() corrige le mojibake UTF-8 des exports Meta.
mergeSignaux() fusionne Instagram et TikTok, avec un plafond par catégorie.
Seuls les signaux extraits quittent le navigateur, jamais l'export brut (minimisation RGPD).
Analyse : runAnalysis() enchaîne buildUserPrompt(), callClaude() puis parseJSON().
buildSystemPrompt(isAdulte) construit le prompt système dynamiquement. Il y injecte le référentiel condensé (condenserReferentiel(), et condenserCPF() si la personne est adulte).
computeHomogeneite() est une heuristique lexicale : si le feed est très concentré, elle demande à l'IA de chercher davantage d'angles morts.
parseJSON() tolère les balises markdown et les virgules finales dans la réponse.
Rapport : drawReport() affiche le domaine, les facettes, les hypothèses et les pistes (jobCard), puis drawCounselor() la partie conseiller (angles morts, inférences risquées). exportHTML() génère un rapport HTML autonome, imprimable.
FALLBACK_REPORT et useFallback() affichent un rapport de démo sans appel API.
Configuration (en haut du <script>, vers la ligne 1424)

const CLAUDE_MODEL = 'claude-sonnet-5';   // Haiku 4.5 si l'hébergeur limite à 60 s
const USE_PROXY    = true;                // true = prod via /api/analyze ; false = clé dans le navigateur
const PROXY_ENDPOINT = '/api/analyze';
Le proxy (/api/analyze)
Il existe en 3 variantes, avec la même logique dans chacune :

Vercel : findyourself-v1/api/analyze.js, c'est l'hébergement actuel.
Netlify : netlify/functions/analyze.js.
Node local : server/server.js, sans aucune dépendance (Node ≥ 18), avec CORS et un rate limit de 20 req/min/IP.
Ce que fait le proxy :

Il garde la clé dans une variable d'environnement (ANTHROPIC_API_KEY, ou key/KEY sur Vercel).
Il vérifie l'en-tête x-access-code par rapport à la variable ACCESS_CODE (code d'accès conseiller).
Il applique une allowlist de modèles et plafonne max_tokens à 8000.
Il désactive le thinking (thinking: {type:'disabled'}). Sans ça, on avait des timeouts 504.
Il ne logue aucun contenu, seulement des métriques anonymes.
La CSP impose connect-src 'self' : le navigateur ne peut techniquement pas appeler Anthropic en direct.
Les référentiels (le « cerveau métier »)
La source de vérité est Data/referentiel_domaines_metiers_v1-1.json : 14 univers, facettes, portes d'entrée, RIASEC, codes ROME.
referentiel.js est généré à partir de ce JSON. Ne jamais l'éditer à la main ; la commande de régénération est dans le README de l'app.
Il en va de même pour referentiel-cpf.js, généré depuis Data/referentiel_formations_cpf.json. ⚠️ Ce fichier est marqué « AMORCE À VÉRIFIER » : les données RNCP sont à contrôler avant la production.
3. Déploiement (état actuel)
Vercel Pro, nécessaire pour maxDuration: 300 avec Sonnet 5. En offre gratuite (60 s), il faut repasser CLAUDE_MODEL à claude-haiku-4-5.
Variables d'environnement à définir : ANTHROPIC_API_KEY et ACCESS_CODE.
La config Netlify est toujours présente et fonctionnelle (voir docs/deploiement.md). Le problème : la limite de 10 s de l'offre gratuite Netlify a provoqué le passage à Vercel.
À ne pas oublier : régler une limite de dépense dans la console Anthropic et utiliser une clé dédiée au site.
4. Historique (11 commits, juillet-août 2026)
20/07 : v2 de l'app plus les Lots 1, 2 et 3 du cahier des charges. Suppression des scores, référentiel branché, garde-fous, proxy, Netlify.
23/07 : migration vers Vercel (fix 404 et timeouts), thinking désactivé, aller-retour Haiku → Sonnet 5, refonte visuelle (palette encre/papier/ambre, police serif).
13-15/08 : rebrand « Motif », formulaire allégé, parser Instagram amélioré (fichiers de « sujets » : your_topics, recommended_topics…), logo.
5. Côté produit et validation (dans docs/)
Cahier des charges : objectifs O1 à O7, Lots 1-2-3, état d'avancement au 12/07.
Test Barnum : protocole plus l'outil outils/test-barnum.html. C'est le verrou de validation : le rapport doit faire mieux qu'un texte générique flatteur. Le test n'a pas encore été mené avec de vrais bénéficiaires.
Pré-AIPD RGPD : ce n'est pas un avis juridique. Il manque encore l'avis d'un DPO, une AIPD et une notice de confidentialité avant toute ouverture à des mineurs.
Mandat du comité d'experts et revue de littérature (RIASEC, Super, Lent, ADVP).
6. ⚠️ Points d'attention et dette à connaître
Le nom change selon les fichiers : FindYourself, Monde. et Motif cohabitent dans les dossiers, la doc, le README et les commentaires. Le nom actuel est Motif.
Le formulaire est sauvegardé en localStorage (fy_form_v2), y compris le champ apiKey. Le README affirme pourtant « pas de localStorage ». Il faut corriger l'un ou l'autre, et surtout ne jamais stocker de clé.
Le prompt est construit côté client et le proxy le relaie tel quel. N'importe qui ayant le code d'accès peut donc utiliser le proxy comme un accès Claude générique. Le durcissement prévu (ET-2) consiste à déplacer buildSystemPrompt côté serveur et à n'accepter que {formData, signaux}.
La logique du proxy est dupliquée 3 fois (Vercel, Netlify, server). Toute modification doit être reportée dans les trois, ou il faut supprimer les variantes inutilisées.
Le README de schemas/ cite un schemas/validate.js qui n'existe pas.
Il y a des fichiers parasites dans le repo : findyourself-v1.zip, image.png (doublon du logo), Data/monde_dossier (1).html, et des commits nommés « . ».
Un export Instagram réel (instagram-gal.clement-…) est présent en local. Il est bien exclu par .gitignore : à garder ainsi, car il contient des données personnelles.
Le commentaire en tête de api/analyze.js parle d'un timeout de 60 s, alors que vercel.json fixe 300 s.
7. Démarrer en tant que nouveau dev
Voir l'app : depuis findyourself-v1/, lancer python -m http.server 8080, puis cliquer « Voir la démo ». Le rapport de secours s'affiche sans API.
Tester l'analyse réelle en local : soit vercel dev ou netlify dev à la racine (avec ANTHROPIC_API_KEY dans l'environnement), soit node server/server.js en adaptant PROXY_ENDPOINT.
Modifier le comportement de l'IA : buildSystemPrompt() et/ou le JSON du référentiel dans Data/ (puis régénérer referentiel.js). Si la structure du rapport change, mettre aussi à jour schemas/rapport.schema.json et drawReport().
Lire en premier : CAHIER_DES_CHARGES.md, puis le README de l'app, puis docs/deploiement.md.
Je peux aussi mettre ce récap dans un document partageable, ou l'ajouter au repo sous forme de HANDOVER.md.