# Évolutions produit — note de synthèse
*Clément → à intégrer dans la réflexion V3 / serveur*

---

## 1. Changement de vocabulaire : "Monde" → "Domaine"

Le terme "monde" ne convient pas. On parlera de **"domaine"** partout :
- Dans le rapport ("Ton domaine, c'est l'automobile")
- Dans l'interface et les libellés
- Dans les prompts IA qui génèrent l'analyse

⚠️ Question à trancher ensemble : est-ce que le nom de marque change aussi, ou est-ce qu'on garde un nom de marque distinct du vocabulaire produit ?

---

## 2. Nouvelle cible : les adultes en reconversion

En plus des jeunes, l'outil s'adresse aux **adultes en reconversion** (en poste ou en reprise d'études).

**Pourquoi c'est stratégique :**
- Même mécanique produit (données comportementales → domaine → portes d'entrée)
- Mais débouché différent : le rapport propose des **formations finançables par le CPF**
- Modèle économique direct : partenariats / apport d'affaires avec des organismes de formation certifiés Qualiopi → source de rentabilité qui ne dépend ni des subventions ni des institutions

**Implications :**
- Deux parcours utilisateur à prévoir : "jeune" / "adulte en reconversion"
- Pour les adultes : intégrer un référentiel de formations éligibles CPF (à terme, regarder l'API MonCompteFormation / France Compétences)

---

## 3. Affiner la situation de formation dans le formulaire initial

Le formulaire de départ doit capturer **précisément où en est la personne**, pas juste son âge. Exemples de granularité attendue :

- Collège (préciser si SEGPA)
- Lycée général → quelles spécialités
- Lycée technologique → quelle filière (STI2D, STMG, ST2S…)
- Bac pro / CAP → quel secteur
- Études supérieures → quelle filière
- En poste / en recherche d'emploi (pour les adultes)

**Pourquoi :** l'analyse doit croiser *données comportementales × situation actuelle* pour proposer des portes d'entrée **réalistes** (passerelles, prérequis, durées adaptées au niveau réel).

---

## 4. Ajouter l'auto-évaluation des compétences au formulaire

Dans le formulaire initial (celui avec prénom/nom + ce qu'on aime faire ou pas), ajouter la question :

> **"Quelles sont tes compétences selon toi ?"**

- Champ libre + éventuellement des suggestions cliquables pour aider ceux qui sèchent
- Intérêt : croiser la perception que la personne a d'elle-même avec ce que révèlent ses données → écarts intéressants à faire ressortir dans le rapport

---

## Récap des impacts techniques

| Évolution | Impact serveur / produit |
|---|---|
| Monde → Domaine | Renommage global (UI, rapport, prompts) |
| Cible adultes reconversion | 2e parcours + référentiel formations CPF |
| Situation de formation précise | Nouveaux champs formulaire + logique de matching par niveau |
| Auto-évaluation compétences | Nouveau champ + intégration dans l'analyse IA |
