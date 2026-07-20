# Protocole — Test Barnum à l'aveugle
*Livrable Lot 2 (EV-1 du cahier des charges) — protocole d'évaluation de la validité perçue*
*Version 1.0 — Juillet 2026*

> **Question à laquelle ce test répond.** Le rapport personnalisé fait-il mieux qu'un rapport générique flatteur (« Barnum ») ? Si les bénéficiaires ne distinguent pas leur rapport d'un rapport passe-partout, alors l'outil ne fait pas mieux qu'un horoscope, quel que soit son enthousiasme. C'est le **verrou de validation** : le cahier des charges conditionne la montée en charge (Lot 3) au passage de ce test.

---

## 1. Hypothèses

- **H0 (hypothèse nulle)** : les bénéficiaires identifient leur rapport personnalisé au niveau du hasard (50 % sur un choix binaire).
- **H1 (hypothèse testée)** : ils l'identifient **significativement au-dessus du hasard**, et le justifient par des éléments **spécifiques** (preuves comportementales, nom du domaine) et non par la seule tonalité flatteuse.

Le critère de succès n'est pas seulement statistique : on veut que la justification pointe la **granularité de reconnaissance** (« ils ont cité mes recherches sur X »), pas « c'était gentil ».

---

## 2. Matériel

Pour chaque participant, deux documents au **même format visuel** (même gabarit, même longueur, même ton) :

- **A — Rapport personnalisé** : la vraie sortie du moteur pour ce participant.
- **B — Rapport Barnum** : un rapport générique, flatteur, plausible, **sans aucune preuve comportementale spécifique**, construit à partir d'énoncés universels (« tu apprends mieux en faisant qu'en lisant », « tu as besoin de sens », « tu n'aimes pas qu'on t'impose un cadre rigide »). Il doit être crédible et positif — le but est qu'il « sonne juste » lui aussi.

L'outil `outils/test-barnum.html` génère automatiquement le rapport Barnum au même gabarit et gère la présentation à l'aveugle et la saisie des réponses. Le rapport Barnum est **volontairement dépourvu** de : nom de domaine précis, preuves chiffrées/datées, comptes cités, croisements inter-univers.

---

## 3. Échantillon

- **Taille cible : ≥ 20 bénéficiaires** ayant réellement fourni des données (sinon le rapport A n'a pas de matière spécifique). Idéalement 30 pour un test binomial confortable.
- **Diversité voulue** : mixité de genre, mixité d'origine sociale, mixité de situations (collège/SEGPA, lycée général, bac pro/CAP, décrocheurs, ≥ 2 adultes en reconversion). Cette diversité sert aussi le Thème 2 (reproduction sociale) : on regardera si le test « marche » moins bien pour certains profils.
- **Consentement** : information adaptée à l'âge + consentement (et consentement parental pour les mineurs, cf. `analyse_rgpd_pre_aipd.md`). Participation volontaire, sans incidence sur l'accompagnement.

---

## 4. Déroulé (par participant, ~15 min)

1. Le facilitateur ouvre `outils/test-barnum.html` et **colle le rapport personnalisé** (JSON exporté par l'app) du participant.
2. L'outil génère le rapport Barnum et **randomise** l'ordre d'affichage (A/B masqués, positions tirées au sort). Le facilitateur **ne sait pas** lequel est lequel à l'écran (double insu pratique : l'ordre est caché même à lui).
3. Le participant lit les deux rapports **dans le calme, sans le conseiller qui commente**.
4. Il répond à 3 questions (saisies dans l'outil) :
   - **Q1 (choix forcé)** : « Lequel de ces deux rapports parle vraiment de toi ? » → 1 ou 2.
   - **Q2 (justification libre)** : « Qu'est-ce qui te fait dire ça ? » (on code après coup : *spécifique* vs *tonalité générale*).
   - **Q3 (échelle)** : justesse ressentie de chaque rapport, 1 à 5 (mesure l'effet Barnum : si B obtient aussi 4/5, c'est le signe attendu que « ça sonne juste » ≠ « c'est valide »).
5. L'outil **révèle** ensuite quel rapport était le vrai et enregistre le résultat (export CSV/JSON local).

**Anti-biais de passation** : ne pas dire au participant qu'un des rapports est « faux » avant la fin ; ne pas orienter la lecture ; présenter les deux comme deux versions à comparer.

---

## 5. Analyse

- **Taux d'identification correcte** (Q1). Test binomial contre p = 0,5. Avec n = 20, il faut ≥ 15/20 corrects pour rejeter H0 à α = 0,05 (unilatéral) ; avec n = 30, ≥ 20/30. (Valeurs à confirmer avec le psychométricien.)
- **Qualité de la justification** (Q2) : proportion de justifications *spécifiques*. Un succès « pour les bonnes raisons » = identification correcte **ET** justification spécifique majoritaire.
- **Écart Barnum** (Q3) : différence de justesse ressentie A − B. Un petit écart malgré une bonne identification est instructif : le générique séduit, mais le spécifique est reconnu comme « le sien ».
- **Analyse par sous-groupe** (genre, origine sociale, situation) : le test réussit-il uniformément ? Un échec ciblé sur les profils populaires ou sur un genre = signal de reproduction/biais à corriger (lien Thème 2 & 3).

---

## 6. Décision

| Résultat | Interprétation | Décision |
|---|---|---|
| Identification **> hasard** + justifications spécifiques | Le moteur apporte une valeur reconnaissable | Feu vert conditionnel : poursuivre, corriger les sous-groupes faibles |
| Identification ≈ hasard | Le rapport ne fait pas mieux qu'un Barnum | **Stop montée en charge.** Revoir le moteur (granularité, preuves) avant tout Lot 3 en production |
| Identification > hasard mais justifications « tonalité » | Adhésion Barnum, pas reconnaissance du spécifique | Renforcer les preuves comportementales et re-tester |

---

## 7. Limites du test (à assumer devant les experts)

- Mesure la **validité perçue / discriminante**, pas la validité prédictive (est-ce que les pistes mènent à de bonnes trajectoires ? — hors de portée d'un test court, relève d'un suivi longitudinal).
- Choix binaire A/B = borne basse ; un test plus dur consisterait à mêler plusieurs rapports d'autres personnes (le participant doit retrouver le sien parmi 4). À envisager en V2 du protocole si le test binaire est passé trop facilement.
- L'effet « nom propre » : le rapport A contient le prénom/la situation. L'outil neutralise ce biais en insérant les mêmes champs identitaires dans le rapport B.
