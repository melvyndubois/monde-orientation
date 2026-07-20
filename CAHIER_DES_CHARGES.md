# CAHIER DES CHARGES — Monde. (ex-FindYourself)
## Outil d'orientation professionnelle par analyse de données comportementales

*Version 1.0 — Juillet 2026*
*Document de travail — synthèse de la v1 pilote, de la note d'évolutions produit et de la revue critique du projet*

---

## 1. CONTEXTE ET VISION

### 1.1 Le problème
L'orientation classique demande à un jeune de choisir **un métier** qu'il ne connaît presque jamais de l'intérieur. Résultat : choix par défaut, autocensure, réorientations coûteuses, motivation fragile.

### 1.2 La proposition
Inverser la logique : identifier d'abord le **domaine** (l'univers qui passionne réellement la personne, détecté dans ses données comportementales TikTok/Instagram), puis les **facettes** (ce qu'elle aime y faire), et seulement ensuite les **métiers**, présentés comme des *portes d'entrée* — jamais comme des destinations définitives.

### 1.3 Le différenciateur
- **Preuve comportementale non-déclarative** : « personne ne performe pour son algorithme ». Le signal observé (visionnages, comptes suivis, recherches) prime sur le déclaratif.
- **Granularité de reconnaissance** : nommer le domaine avec le mot exact de la personne (« la moto », pas « la mobilité ») pour déclencher le « ils m'ont compris ».
- **La fenêtre, pas le miroir** *(nouveau — axe stratégique)* : l'outil ne se contente pas de refléter le feed ; il détecte les **angles morts** et propose activement des métiers que la personne n'a jamais croisés. Ce renversement transforme le risque de reproduction sociale en fonctionnalité centrale.

### 1.4 Positionnement éthique (contrat produit)
L'outil produit des **hypothèses et des amorces de conversation** pour un entretien conseiller/bénéficiaire — jamais des verdicts. Toute l'interface, le rapport et les prompts doivent être alignés sur ce principe (cf. §5.3 : suppression des scores chiffrés).

---

## 2. EXISTANT (V1 — état des lieux)

| Composant | État | Localisation |
|---|---|---|
| App web auto-contenue (HTML/CSS/JS vanilla, sans backend) | ✅ Fonctionnelle, pilote | `W-etudiant-main/findyourself-v1/index.html` |
| Parsing exports TikTok + Instagram (JSON/ZIP, JSZip) | ✅ Fonctionnel | fonctions `extraireSignaux*`, `mergeSignaux` |
| Appel direct API Anthropic depuis le navigateur | ✅ (acceptable pilote uniquement) | `callClaude`, clé saisie par l'utilisateur |
| SYSTEM_PROMPT avec règles d'interprétation (R1-R9) | ✅ mais **non adossé au référentiel** | `index.html` ~ligne 1273 |
| Rapport double lecture (jeune / conseiller) avec scores % | ✅ mais scores à supprimer | `drawReport`, `scoreCard`, `jobCard` |
| Référentiel domaines/métiers (14 univers, facettes, ROME, RIASEC) | ✅ v1.1 JSON structuré, **non branché à l'app** | `Data/referentiel_domaines_metiers_v1-1.json` |
| Démo (persona Tony, 16 ans, 2nde) | ✅ | `demo-data/tony_demo.json` |
| Dossier de présentation partenaires + maquette rapport « Monde. » | ✅ | `Data/monde_dossier.html`, `Data/monde_rapport_tony.html` |

### 2.1 Failles identifiées (revue critique)
1. **Effet Barnum non écarté** : aucun protocole ne distingue le rapport d'un texte générique flatteur.
2. **Saut consommation → métier injustifié** : l'outil confond intérêt, aptitude et adéquation ; le signal est pollué par l'algorithme de la plateforme.
3. **Fausse précision** : les scores chiffrés (« 94 % match ») impliquent une psychométrie qui n'existe pas.
4. **Reproduction sociale** : le feed reflète l'origine sociale ; sans garde-fou, l'outil renvoie chaque jeune vers son milieu.
5. **Contradiction produit/discours** : le discours dit « hypothèses », l'interface dit « verdicts ».
6. **Zone juridique non traitée** : profilage algorithmique de mineurs (RGPD/CNIL).

---

## 3. OBJECTIFS DE LA VERSION CIBLE (V2/V3)

| # | Objectif | Critère de succès |
|---|---|---|
| O1 | Réaligner le rapport sur le positionnement « hypothèses, pas verdicts » | Zéro pourcentage/score chiffré visible dans le rapport |
| O2 | Adosser l'analyse IA au référentiel domaines/facettes/RIASEC | Le prompt raisonne exclusivement via le référentiel v1.1 |
| O3 | Intégrer des garde-fous anti-biais (angles morts, genre, classe) | Chaque rapport contient ≥1 piste « hors feed » documentée |
| O4 | Valider scientifiquement (test Barnum + comité d'experts) | Test à l'aveugle réalisé sur ≥20 bénéficiaires ; avis écrit de ≥3 spécialistes |
| O5 | Sécuriser juridiquement (mineurs, RGPD) | Avis DPO/juriste ; registre de traitement ; consentement conforme |
| O6 | Ouvrir le parcours « adulte en reconversion » (CPF) | 2e parcours fonctionnel avec référentiel formations CPF |
| O7 | Passer en architecture sécurisée (backend proxy) | Aucune clé API côté client en production |

---

## 4. UTILISATEURS ET PARCOURS

### 4.1 Personas
- **Bénéficiaire jeune** (14-25 ans) : collège (dont SEGPA), lycée général (spécialités), techno (filière), Bac pro/CAP (secteur), études sup, décrocheur, sans projet.
- **Bénéficiaire adulte en reconversion** : en poste ou en recherche ; débouché = formations finançables CPF.
- **Conseiller** (Mission Locale, lycée, CIO, organisme de formation) : anime l'entretien, lit la section professionnelle du rapport.

### 4.2 Parcours bénéficiaire (commun)
1. **Accueil** : promesse, explication de la confidentialité (obligatoire avant toute collecte).
2. **Formulaire** :
   - Identité minimale (prénom, âge).
   - **Situation de formation précise** (granularité : SEGPA, spécialités, filière techno, secteur bac pro/CAP, filière sup, en poste/recherche).
   - Goûts déclarés (aime / n'aime pas).
   - **Auto-évaluation des compétences** *(nouveau)* : « Quelles sont tes compétences selon toi ? » — champ libre + suggestions cliquables. Sert à faire ressortir les écarts déclaratif/comportemental dans le rapport.
   - Dépôt des exports TikTok (`user_data.json`) et/ou Instagram (ZIP ou `your_topics.json`).
3. **Analyse** : écran d'attente animé (phrases éditables).
4. **Rapport** : lu **en entretien**, jamais livré seul à un mineur (cf. §5.3).

### 4.3 Bifurcation adulte
- Mêmes étapes, mais : champs situation adaptés (poste actuel, ancienneté, projet), et portes d'entrée = **formations éligibles CPF** (référentiel dédié ; à terme API MonCompteFormation / France Compétences).

---

## 5. EXIGENCES FONCTIONNELLES

### 5.1 Ingestion des données (pilier 1 : « comment on lit les données »)
- **EF-1.1** Parser les exports TikTok JSON et Instagram JSON/ZIP, y compris archives volumineuses (streaming par tranches).
- **EF-1.2** Extraire des signaux normalisés et **documentés** : recherches, comptes suivis, sujets/vidéos, horaires de visionnage (les patterns 22h-2h restent surpondérés), volumes par thème.
- **EF-1.3** Produire une **spécification écrite du format des signaux envoyés à l'IA** (schéma JSON versionné). Ce format conditionne la stratégie de prompt (patterns pré-extraits vs données brutes) et doit être un livrable à part entière.
- **EF-1.4** Mesurer et transmettre à l'IA un indicateur d'**homogénéité du feed** (ex : % du volume sur le thème dominant) pour déclencher la logique d'angles morts.
- **EF-1.5** Aucune donnée conservée après la session (pilote) ; en V3 serveur, conservation minimale définie avec le DPO (cf. §8).

### 5.2 Moteur d'analyse IA (pilier 2 : « ce qu'on en fait »)
- **EF-2.1** Le SYSTEM_PROMPT est **reconstruit autour du référentiel v1.1** (injecté ou résumé dans le prompt) : macro-univers → domaines précis → facettes-verbes → portes d'entrée, mapping ROME/RIASEC.
- **EF-2.2** L'IA raisonne en **dimensions RIASEC** (vocabulaire partagé avec les conseillers) au lieu de scores maison. Cadres de référence : Holland/RIASEC, Super, théorie sociale cognitive de carrière (Lent), ADVP.
- **EF-2.3** **Distinction explicite intérêt / aptitude / adéquation** : chaque inférence est étiquetée (« intérêt observé », « aptitude supposée — à vérifier en entretien », etc.). L'IA n'affirme jamais une aptitude à partir du seul visionnage.
- **EF-2.4** **Garde-fous anti-biais obligatoires** dans le prompt :
  - détection des angles morts (« zéro contenu X vu → proposer une piste hors feed ») ;
  - vigilance biais de genre et de classe (ne jamais restreindre l'ambition selon l'origine ou le genre inféré) ;
  - rappel que le feed reflète en partie l'algorithme de la plateforme, pas seulement la personne ;
  - documentation de toute inférence risquée dans la section conseiller.
- **EF-2.5** Règles moteur du référentiel conservées : domaine précis affiché (jamais le macro-univers), 1 domaine principal + 1-2 secondaires avec **preuves comportementales** (pas de %), 4 portes d'entrée dont ≥1 immédiatement accessible, ≥1 niche/découverte, ≥1 entrepreneuriale si facette détectée, croisements inter-univers privilégiés, la situation de formation adapte les *voies* jamais l'*ambition*.
- **EF-2.6** Détection des cas sensibles (décrochage, anxiété, détresse) → alertes **uniquement** dans la section conseiller ; ton adapté côté bénéficiaire.
- **EF-2.7** Croisement auto-évaluation des compétences × signaux comportementaux : faire ressortir les écarts comme matière à conversation.
- **EF-2.8** Sortie en JSON strict, schéma versionné (cf. EF-3.1). Modèle : dernière génération Claude disponible, constante configurable.
- **EF-2.9** Pas de « skill »/outillage complexe : la puissance repose sur un prompt structuré + le référentiel (décision actée en revue).

### 5.3 Rapport (livrable bénéficiaire + conseiller)
- **EF-3.1** **Suppression totale des scores chiffrés** : plus de « % match », plus de jauges « créativité 85 % ». Remplacés par :
  - des **hypothèses formulées** (« Ce qu'on observe → ce que ça pourrait vouloir dire → à explorer ensemble ») ;
  - des **preuves comportementales citées** (comptes, recherches, volumes) ;
  - des **niveaux qualitatifs** si besoin (signal fort / moyen / faible), jamais de nombre.
- **EF-3.2** Structure du rapport : domaine principal nommé dans le vocabulaire de la personne, facettes en verbes, 4 portes d'entrée avec voies d'accès réalistes (formation, durée, type), **dont au moins une « fenêtre »** (métier absent du feed, avec explication du pourquoi).
- **EF-3.3** Double lecture maintenue :
  - **Partie bénéficiaire** : directe, sans jargon, surprenante, ancrée dans ses références, jamais moralisatrice ni anxiogène.
  - **Partie conseiller** : lecture analytique, points d'attention, inférences risquées documentées, **questions de conversation** par trait et par métier, pièges à éviter, 1 action concrète, ressources (ONISEP, ROME/MétierScope, Parcoursup, CPF pour les adultes).
- **EF-3.4** Salaires et tension marché : récupérés à la volée (MétierScope) ou présentés comme indicatifs et datés — jamais figés en base.
- **EF-3.5** Export HTML autonome du rapport (fonction existante à conserver).

### 5.4 Parcours adulte / CPF
- **EF-4.1** Référentiel de formations éligibles CPF par domaine (source RNCP/France Compétences), avec les mêmes règles d'accessibilité réaliste.
- **EF-4.2** Modèle économique associé : traçabilité des mises en relation avec organismes certifiés Qualiopi (apport d'affaires), sans que la recommandation soit biaisée par le partenariat (règle d'éthique à écrire noir sur blanc).

### 5.5 Vocabulaire et marque
- **EF-5.1** Renommage global « monde » → **« domaine »** : UI, rapport, prompts.
- **EF-5.2** Décision à trancher : nom de marque (« Monde. » conservé comme marque distincte du vocabulaire produit, ou renommage complet). Bloquant pour les livrables marketing, pas pour le développement.

---

## 6. EXIGENCES DE VALIDATION SCIENTIFIQUE

- **EV-1 Test Barnum à l'aveugle** *(prioritaire, faisable immédiatement)* : chaque testeur reçoit son rapport personnalisé ET un rapport générique flatteur, sans savoir lequel est lequel ; il doit identifier le sien et dire pourquoi. Cible : ≥20 bénéficiaires. Si le taux d'identification n'est pas significativement supérieur au hasard, le moteur d'analyse doit être revu avant tout déploiement.
- **EV-2 Revue de littérature courte** (4-5 papiers, pas d'ouvrages complets) sur 3 thèmes : validité RIASEC/orientation ; reproduction sociale dans l'orientation (Bourdieu et travaux récents) ; biais algorithmiques et bulles de filtre (Pariser, Sunstein, homophilie). Livrable : note de synthèse ~15 pages max alimentant directement le prompt.
- **EV-3 Comité d'experts** avec mandat de **casser** les morceaux qui ne marchent pas (pas de caution de façade) :
  - psychométricien (validité, Barnum) ;
  - psychologue de l'orientation ;
  - sociologue de l'éducation (reproduction, biais de genre) ;
  - DPO / expert CNIL.
- **EV-4 Boucle terrain** : recueil structuré du feedback conseillers après chaque entretien pilote (le rapport a-t-il ouvert la conversation ? une piste « fenêtre » a-t-elle été retenue ?).

---

## 7. EXIGENCES TECHNIQUES

### 7.1 Architecture cible (V3)
- **ET-1** Backend proxy pour l'API Anthropic : **aucune clé API côté client** en production. Le pilote actuel (clé dans le navigateur) reste limité à l'usage interne.
- **ET-2** Front conservant la philosophie légère (pas de framework imposé), mais découpage du monolithe `index.html` : parsing, prompts, rendu rapport et référentiel en modules séparés et testables.
- **ET-3** Le référentiel v1.1 JSON devient une **dépendance chargée** par le moteur (pas de duplication dans le prompt en dur) ; versionné, revu 2×/an au rythme du ROME.
- **ET-4** Schémas JSON versionnés pour : signaux extraits (entrée IA) et rapport (sortie IA). Toute évolution de schéma est documentée.
- **ET-5** Journalisation minimale côté serveur (métriques d'usage anonymisées), compatible avec la politique de conservation définie avec le DPO.
- **ET-6** Intégrations à instruire (V3+) : API ROME/francetravail.io, MétierScope, API MonCompteFormation.

### 7.2 Compatibilité et déploiement
- **ET-7** Navigateurs récents desktop + mobile ; les exports se manipulent souvent depuis le téléphone du jeune.
- **ET-8** Pilote : déploiement statique (Netlify/GitHub Pages) conservé tant que le backend n'existe pas. Production : hébergement UE.

---

## 8. EXIGENCES JURIDIQUES ET ÉTHIQUES (RGPD / mineurs)

- **EJ-1** Qualification du traitement avec un DPO : **profilage algorithmique de mineurs** à visée d'aide à la décision — terrain sensible même médiatisé par un conseiller. Analyse d'impact (AIPD) probablement requise.
- **EJ-2** Consentement : information claire et adaptée à l'âge avant tout upload ; consentement parental à instruire selon l'âge ; le bénéficiaire reste maître de ses données (principe déjà affiché dans le dossier de présentation — à rendre juridiquement effectif).
- **EJ-3** Minimisation : n'envoyer à l'IA que les signaux nécessaires (jamais l'export brut complet en production) ; pas de conservation au-delà de la session sauf base légale explicite.
- **EJ-4** Transparence : le rapport mentionne ses limites (note méthodologique conservée), le fait que l'analyse repose sur une IA, et le droit de contester/ignorer les pistes.
- **EJ-5** Règle anti-conflit d'intérêts (parcours adulte) : les partenariats organismes de formation ne modifient jamais le classement des recommandations ; mention de tout lien commercial.

---

## 9. LOTISSEMENT ET PRIORITÉS

### Lot 1 — Réalignement produit (rapide, sans backend)
1. Réécriture du SYSTEM_PROMPT : intégration du référentiel v1.1, grille RIASEC, garde-fous anti-biais, distinction intérêt/aptitude/adéquation, logique d'angles morts.
2. Suppression des scores chiffrés dans le schéma JSON et le rendu du rapport ; remplacement par hypothèses + preuves + questions.
3. Renommage « monde » → « domaine » ; ajout du champ auto-évaluation des compétences ; granularité de la situation de formation.

### Lot 2 — Validation (en parallèle du Lot 1)
4. Protocole et exécution du test Barnum à l'aveugle (≥20 bénéficiaires).
5. Note de littérature (3 thèmes) ; constitution du comité d'experts ; premier avis DPO/CNIL.

### Lot 3 — Industrialisation (V3 serveur)
6. Backend proxy + sécurisation de la clé ; découpage modulaire du front ; schémas versionnés.
7. Parcours adulte en reconversion + référentiel CPF ; intégrations France Travail/MonCompteFormation.
8. Mise en conformité RGPD complète (AIPD, consentement, conservation).

**Dépendances clés** : le Lot 3 ne démarre pas tant que le test Barnum (Lot 2) n'a pas confirmé que le moteur fait mieux qu'un texte générique. Le Lot 1 ne dépend de rien : à lancer immédiatement.

---

## 10. CRITÈRES D'ACCEPTATION GLOBAUX

| Critère | Mesure |
|---|---|
| Alignement produit/discours | Aucun score chiffré visible ; 100 % des pistes formulées en hypothèses + questions |
| Ancrage référentiel | 100 % des domaines/portes issus du référentiel v1.1 (traçables) |
| Anti-reproduction sociale | ≥1 piste « fenêtre » (hors feed) par rapport, justifiée |
| Validité | Test Barnum : identification du rapport personnel significativement > hasard |
| Réalisme des voies | Chaque porte d'entrée a une voie d'accès vérifiée (ROME/MétierScope) compatible avec la situation déclarée |
| Sécurité | Zéro clé API côté client en production |
| Conformité | Avis DPO écrit ; information/consentement conformes avant collecte |

---

## 10 bis. ÉTAT D'AVANCEMENT (au 12/07/2026)

### Lot 1 — Réalignement produit ✅ *livré*
Prompt reconstruit (RIASEC + 6 garde-fous), scores chiffrés supprimés partout, bloc « domaine », pistes « fenêtre », formulaire granulaire + auto-évaluation des compétences, référentiel branché (`referentiel.js`). Voir `findyourself-v1/`.

### Lot 2 — Validation ✅ *livrables produits (exécution à mener avec des humains)*
| Livrable | Fichier | Reste à faire (humain) |
|---|---|---|
| Revue de littérature (3 thèmes, ~11 sources) | `docs/revue_litterature.md` | Re-vérification des sources par le comité |
| Protocole test Barnum à l'aveugle | `docs/protocole_test_barnum.md` | **Passation sur ≥20 bénéficiaires** |
| Outil de test Barnum (généré + comparaison + CSV) | `outils/test-barnum.html` | Utilisation en séance |
| Mandat du comité d'experts | `docs/comite_experts_mandat.md` | Recrutement des 4 profils |
| Analyse RGPD / pré-AIPD | `docs/analyse_rgpd_pre_aipd.md` | **Validation par un DPO ; AIPD formelle** |

### Lot 3 — Industrialisation ✅ *socle technique livré*
| Élément | Fichier | Statut |
|---|---|---|
| Backend proxy (clé côté serveur) | `server/` | ✅ fonctionnel (Node ≥18, sans dépendance) |
| Bascule front proxy/pilote + clé masquée | `findyourself-v1/index.html` (`BACKEND_URL`) | ✅ |
| Consentement RGPD (+ parental si mineur) | `index.html` (gate `consent-*`) | ✅ |
| Instruction anti-données sensibles | prompt GF6 | ✅ |
| Schémas JSON versionnés | `schemas/` | ✅ signaux v1, rapport v2 |
| Référentiel formations CPF + injection adulte | `Data/referentiel_formations_cpf.json`, prompt | ✅ amorce à vérifier RNCP |
| Découpage modulaire complet du front / prompt côté serveur | — | ⏳ différé (documenté dans `server/README.md`) |
| Intégrations API France Travail / MonCompteFormation | — | ⏳ nécessite accès/clés |

**Conditions de passage en production** (inchangées) : test Barnum concluant + avis DPO + AIPD. Le socle technique est prêt à les accueillir.

---

## 11. HORS PÉRIMÈTRE (pour l'instant)

- Équation ou algorithme de scoring « mathématiquement rigoureux » : écarté explicitement — la valeur vient de *structure théorique claire + interprétation humaine + explicabilité*, pas d'une boîte noire.
- Skills/outillage agentique Claude : jugé overkill ; un prompt structuré suffit.
- Application mobile native.
- Connexion OAuth directe aux plateformes (on reste sur l'export utilisateur, qui garantit la maîtrise des données par le bénéficiaire).

---

*Contact projet : Clément Gal — clement.gal.pro@gmail.com*
*Prochaine révision du document : après résultats du test Barnum et premier avis du comité d'experts.*
