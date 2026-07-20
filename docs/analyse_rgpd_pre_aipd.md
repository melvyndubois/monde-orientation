# Analyse RGPD / pré-AIPD
*Livrable Lot 2 (EV-3 & EJ-1 du cahier des charges)*
*Version 1.0 — Juillet 2026*

> ⚠️ **AVERTISSEMENT — CE DOCUMENT N'EST PAS UN AVIS JURIDIQUE.**
> Il s'agit d'un **document de cadrage interne**, rédigé pour préparer et structurer le travail d'un DPO / juriste / expert CNIL, pas pour le remplacer. Le traitement décrit — **profilage algorithmique de mineurs à visée d'aide à la décision d'orientation** — est un terrain juridiquement sensible qui exige une validation professionnelle avant tout déploiement en production. Toute affirmation ci-dessous est une hypothèse de travail à confirmer.

---

## 1. Pourquoi ce traitement est sensible

Trois facteurs cumulés placent ce produit dans une zone à haut risque au sens du RGPD :

1. **Personnes concernées majoritairement mineures** (14–17 ans) — protection renforcée (considérant 38, art. 8 RGPD).
2. **Profilage** au sens de l'art. 4(4) : évaluation d'aspects personnels (intérêts, aptitudes supposées, orientation) à partir de données comportementales.
3. **Données potentiellement révélatrices de catégories particulières** (art. 9) : un export TikTok/Instagram peut laisser transparaître, par déduction, des opinions, une orientation sexuelle, des convictions religieuses, un état de santé. Même non recherchées, ces données peuvent être *présentes* dans les signaux bruts.

→ Une **Analyse d'Impact relative à la Protection des Données (AIPD / DPIA, art. 35)** est très probablement **obligatoire**. Ce document en est le brouillon préparatoire.

---

## 2. Cartographie du traitement (à faire valider)

| Élément | Situation pilote (v1/v2) | Cible production (v3) |
|---|---|---|
| **Responsable de traitement** | À désigner formellement (l'entité Monde./FindYourself) | idem |
| **Finalité** | Aider un conseiller à ouvrir un dialogue d'orientation | idem — finalité unique, pas de réutilisation |
| **Base légale envisagée** | Consentement (art. 6-1-a) + consentement parental si mineur < 15 ans (art. 8, seuil France) | À trancher avec le DPO : consentement, ou mission d'intérêt public si porté par une institution |
| **Données** | Export brut de la plateforme (volumineux, large) → **signaux extraits** (minimisés) | N'envoyer que les signaux extraits, jamais l'export brut |
| **Destinataires** | API Anthropic (sous-traitant / transfert) ; le conseiller | idem + hébergeur backend |
| **Transfert hors UE** | Oui — API Anthropic (USA) | À encadrer (clauses contractuelles types, analyse de transfert) |
| **Durée de conservation** | Aucune (session uniquement, revendiqué) | À définir : idéalement aucune conservation serveur, ou durée minimale justifiée |
| **Traitement local vs serveur** | Parsing en local navigateur ; seuls les signaux partent vers l'IA | Parsing local conservé ; proxy backend pour la clé, sans stockage des contenus |

---

## 3. Principes RGPD — état et actions

### 3.1 Minimisation (art. 5-1-c) — **action prioritaire**
L'export brut TikTok/Instagram contient énormément de données non nécessaires. **Ne doivent quitter le navigateur que les signaux extraits et agrégés** (comptes, thèmes, recherches, patterns horaires), jamais le fichier brut. Le parsing local de l'app va dans ce sens ; à garantir aussi côté proxy (le backend ne reçoit et ne logge que les signaux, cf. Lot 3).

### 3.2 Transparence (art. 12–14) — partiellement traité
- Information adaptée à l'âge, avant toute collecte. La mention v2 sous le formulaire (« hypothèses, pas verdicts ; IA ; droit de contester ») est un début, **insuffisant** seul : il faut une notice complète (finalité, base légale, destinataires dont Anthropic/USA, durée, droits, contact DPO).
- **À créer** : une page/notice de confidentialité dédiée + un écran de consentement explicite (implémenté en v3, voir §4).

### 3.3 Consentement et mineurs (art. 8) — **point dur**
- En France, le seuil de consentement numérique autonome est **15 ans**. En dessous, **consentement parental** requis.
- Le consentement doit être **libre** : attention au contexte Mission Locale/lycée où la « proposition » d'un conseiller peut être perçue comme contraignante. Prévoir un refus sans conséquence sur l'accompagnement.
- **À trancher avec le DPO** : recueil et vérification du consentement parental (modalités réalistes en Mission Locale).

### 3.4 Décision automatisée (art. 22)
- L'art. 22 encadre les décisions **entièrement automatisées** produisant des effets significatifs. Ici, **l'humain (conseiller) est dans la boucle** : le rapport est un support de dialogue, pas une décision. C'est un argument favorable — **à condition que ce soit vrai en pratique**. Si un jour le rapport était remis directement au jeune sans conseiller, l'analyse changerait. À documenter et à verrouiller par le design (le rapport reste un outil d'entretien).

### 3.5 Catégories particulières (art. 9)
- Le produit ne doit **pas rechercher** de données sensibles. Mais elles peuvent apparaître incidemment dans les signaux. Actions : instruction explicite au moteur de **ne pas inférer ni restituer** d'attributs sensibles (orientation sexuelle, religion, santé, origine) ; filtrage/anonymisation à étudier côté extraction.

### 3.6 Sécurité (art. 32)
- Pilote : clé API dans le navigateur = acceptable seulement en usage interne restreint. **Non déployable en production.**
- Production : proxy backend (Lot 3), clé côté serveur, HTTPS, pas de log des contenus, hébergement UE de préférence.

---

## 4. Traduction produit déjà engagée (v2/v3)

| Exigence | Statut |
|---|---|
| Ne transmettre que les signaux extraits | ✅ parsing local ; à garantir côté proxy |
| Écran de consentement explicite avant analyse | ✅ implémenté v3 (gate de consentement dans le formulaire) |
| Mention IA + droit de contester | ✅ v2 |
| Instruction anti-inférence de données sensibles | ⏳ à ajouter au prompt (recommandé) |
| Clé API hors du client | ✅ proxy backend livré (Lot 3) |
| Notice de confidentialité complète | ⏳ à rédiger avec le DPO |
| AIPD formelle | ⏳ à conduire avec le DPO — **bloquant pour la production** |

---

## 5. Registre des questions ouvertes pour le DPO

1. Base légale définitive : consentement vs mission d'intérêt public (selon le portage institutionnel) ?
2. Modalités réalistes de consentement parental en Mission Locale / lycée ?
3. Encadrement du transfert hors UE (Anthropic/USA) : clauses, analyse de transfert, alternative UE ?
4. Faut-il une durée de conservation nulle stricte, ou une conservation minimale (statistiques anonymisées) est-elle acceptable et sous quelles conditions ?
5. Périmètre de l'AIPD et calendrier avant premier déploiement partenaire.
6. Politique en cas de détection d'un cas sensible (détresse) : articulation avec les obligations du conseiller.

> **Conclusion de cadrage.** En l'état, le produit peut continuer en **pilote interne restreint** (données de test/consenties, pas de production ouverte). Le passage à un déploiement partenaire réel est **subordonné** à : AIPD conduite, notice de confidentialité, écran de consentement validé, proxy en place (fait), et avis écrit du DPO. Ces conditions sont reprises dans les critères d'acceptation du cahier des charges.
