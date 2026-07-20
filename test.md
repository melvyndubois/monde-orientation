C'est fait : le Lot 1 du cahier des charges (réalignement produit, tout ce qui est faisable sans backend) est implémenté et vérifié. Voici le récap.

Ce qui a changé
1. Le référentiel est enfin branché à l'app — referentiel.js
Nouveau fichier généré automatiquement depuis Data/referentiel_domaines_metiers_v1-1.json (la source de vérité, pas de duplication manuelle). Les 14 univers, 14 facettes, portes d'entrée et portes farfelues sont maintenant injectés dans le prompt à chaque analyse. La commande de régénération est documentée dans le README.

2. Le SYSTEM_PROMPT est entièrement réécrit — buildSystemPrompt() dans index.html

Ancré sur les cadres théoriques reconnus : RIASEC/Holland, Super, Lent, ADVP — l'IA raisonne en dimensions RIASEC, plus en scores maison.
Méthode « domaine avant métier » explicite : domaine précis (mot exact de la personne) → facettes-verbes → portes d'entrée.
5 garde-fous anti-biais : le feed n'est pas la personne (biais algorithmique), la fenêtre pas le miroir (angles morts obligatoires), vigilance reproduction sociale et genre, gestion de l'homogénéité du feed, documentation des inférences risquées.
Distinction intérêt / aptitude / adéquation : chaque hypothèse est étiquetée ; l'IA ne peut plus déduire une aptitude d'un simple visionnage.
Parcours adulte : formations CPF/RNCP et VAE quand la situation est « reconversion ».
3. Plus aucun score chiffré nulle part (la contradiction produit/discours est levée)
Les « 94% match » et jauges « créativité 85% » ont disparu du schéma JSON, du rapport à l'écran et de l'export imprimable. Remplacés par : niveaux qualitatifs fort/moyen/faible toujours accompagnés d'une preuve comportementale, hypothèses formulées, et questions de conversation. Les salaires sont désormais marqués « (indicatif) ».

4. Nouveau rapport

Un bloc « Ton domaine » (nom en grand, preuves, domaines secondaires, facettes) remplace les anneaux de scores.
« Métiers qui te correspondent » devient « Des portes d'entrée vers ton domaine », avec une note explicite « pistes, pas verdicts ».
Badge violet « ✦ Fenêtre » sur les métiers hors feed, avec l'explication « jamais croisé dans ton feed — pourquoi on te le montre ».
Section conseiller enrichie : angles morts du feed et inférences à prendre avec prudence.
5. Formulaire enrichi

Situation de formation granulaire (9 options du référentiel : SEGPA, lycée général avec spécialités, filière techno, secteur CAP/Bac pro, études sup, adulte en poste/en recherche) avec champ de précision contextuel.
Nouveau champ « Quelles sont tes compétences selon toi ? » avec suggestions cliquables — le prompt croise cette auto-évaluation avec les signaux pour faire ressortir les écarts.
6. Indicateur d'homogénéité du feed (computeHomogeneite()) : heuristique lexicale transmise à l'IA pour déclencher la recherche d'angles morts quand le feed est trop concentré.

7. Divers : modèle passé à claude-sonnet-5, mention de transparence IA sous le formulaire (« hypothèses à discuter, pas des verdicts »), démo Tony et rapport de secours réécrits au nouveau schéma (avec une piste fenêtre « scénographe » exemplaire), README à jour.

Vérifications effectuées
Syntaxe JS validée, et exécution réelle sous Node avec DOM simulé : génération du prompt système (~7 700 tokens, tous les garde-fous présents, zéro score chiffré), user prompt jeune et adulte, rendu complet du rapport et export HTML sur les données de démo — aucune exception, aucun pourcentage résiduel.

Ce qui reste (Lots 2 et 3 du cahier des charges — non couvert ici)
Le test Barnum à l'aveugle, la revue de littérature, le comité d'experts et l'avis DPO (Lot 2), puis le backend proxy pour la clé API et le référentiel formations CPF complet (Lot 3). Le Lot 2 ne demande pas de code — tu peux le lancer dès les prochains tests utilisateurs.

Pour tester : lance python -m http.server 8080 dans findyourself-v1/ et utilise le mode démo (bouton « Voir un rapport de démo » en cas d'erreur API pour voir le nouveau rendu sans clé).


Lot 2 — Validation (livrables produits, exécution humaine à mener)
Quatre documents + un outil, dans docs/ et outils/ :

Revue de littérature — synthèse opérationnelle sur les 4 thèmes, avec ~11 sources réelles et, pour chacun, un « ce que ça change pour le produit ». Points saillants que tu peux réutiliser face aux experts : la congruence RIASEC prédit faiblement le bien-être (corrélations modestes) — donc bon langage de dialogue, mauvais prédicteur ; Gottfredson (circonscription/compromis) fonde théoriquement la fonction « fenêtre » ; Lambrecht & Tucker 2019 donne la preuve empirique du biais de genre algorithmique (une pub STEM neutre est montrée à moins de femmes). Le document se termine par un avertissement d'honnêteté : les sources doivent être re-vérifiées par le comité.
Protocole du test Barnum — hypothèses, échantillon (≥20, diversifié), déroulé, seuils statistiques, grille de décision (le verrou qui conditionne la production).
Outil de test Barnum — page autonome et fonctionnelle : on colle le rapport JSON réel, elle génère un rapport générique (volontairement sans preuve spécifique), randomise A/B à l'aveugle, recueille les 3 réponses, révèle le vrai et exporte les résultats en CSV/JSON. Testé : génération Barnum, rendu, tirage au sort.
Mandat du comité d'experts — 4 profils (psychométricien, psy de l'orientation, sociologue, DPO/CNIL), questions explicites par expert, et l'engagement clé : ils ont le droit de casser des morceaux, les avis sont publiés sans édulcoration.
Analyse RGPD / pré-AIPD — cadrage complet, explicitement marqué comme non-juridique et à valider par un DPO : profilage de mineurs, base légale, minimisation, art. 22 (humain dans la boucle), catégories sensibles, registre de questions ouvertes.
Lot 3 — Industrialisation (socle technique livré et testé)
Backend proxy — serveur Node sans aucune dépendance (node server.js), clé API côté serveur uniquement, CORS en allowlist, rate-limiting, limite de taille, modèles en allowlist, pas de log de contenu (RGPD). Testé en réel : /health → 200, corps invalide → 400, préflight → 204, route inconnue → 404, refus de démarrer sans clé.
Front adapté (index.html) — une constante BACKEND_URL bascule entre mode pilote (clé navigateur) et mode production (proxy, champ clé masqué, aucune clé côté client).
Consentement RGPD — gate obligatoire avant analyse, avec consentement parental conditionnel qui apparaît si l'âge < 15 ans ; + instruction GF6 anti-données-sensibles ajoutée au prompt.
Schémas JSON versionnés — signaux v1 (entrée) et rapport v2 (sortie, sans scores chiffrés) ; le rapport de secours a été vérifié conforme aux champs requis.
Référentiel formations CPF — 19 certifications éligibles CPF mappées aux univers, injectées dans le prompt uniquement pour le parcours adulte (testé : le prompt adulte contient le bloc CPF, le prompt jeune non).
Ce qui reste hors de ma portée (documenté, pas oublié)
Trois choses nécessitent des humains ou des accès que je n'ai pas, et je les ai marquées comme telles dans le cahier des charges (nouvelle section 10 bis, statuts à jour) :

L'exécution du test Barnum (≥20 jeunes) et le recrutement du comité — les outils sont prêts.
La validation DPO + l'AIPD formelle — le brouillon est prêt, mais je ne peux pas me substituer à un juriste, et je ne le présente pas comme tel.
Le durcissement du proxy (prompt entièrement côté serveur) et les intégrations France Travail/MonCompteFormation (nécessitent des clés d'API) — différés et documentés dans server/README.md.
Les conditions de passage en production restent celles du cahier des charges : test Barnum concluant + avis DPO + AIPD. Le socle technique est maintenant prêt à les accueillir.

Pour tester le tout : node server/server.js (avec ANTHROPIC_API_KEY), mettre BACKEND_URL dans index.html, puis servir findyourself-v1/ ; et ouvrir outils/test-barnum.html directement pour l'outil de validation