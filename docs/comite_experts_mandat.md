# Mandat du comité d'experts
*Livrable Lot 2 (EV-3 du cahier des charges)*
*Version 1.0 — Juillet 2026*

> **Principe directeur.** Les experts ne sont pas convoqués pour apposer une caution scientifique sur un produit déjà décidé. Ils sont convoqués **avec le droit et le mandat explicite de dire que des morceaux ne marchent pas** — et l'engagement de l'équipe de les corriger ou de les retirer. Une caution de façade serait pire qu'aucune caution : elle donnerait une légitimité indue à un profilage de mineurs.

---

## 1. Composition

| Profil | Ce qu'il/elle contrôle | Question centrale posée |
|---|---|---|
| **Psychométricien(ne)** | Validité, effet Barnum, honnêteté des « scores » | Le rapport mesure-t-il quelque chose, ou produit-il un horoscope crédible ? |
| **Psychologue de l'orientation** | Cadres théoriques (RIASEC, Super, SCCT, Gottfredson), posture | Le raisonnement est-il conforme à l'état de l'art ? La posture « hypothèses » tient-elle jusqu'au bout ? |
| **Sociologue de l'éducation** | Reproduction sociale, autocensure, biais de genre et de classe | Les recommandations renvoient-elles les jeunes vers leur origine sociale ? |
| **DPO / expert(e) CNIL** | Profilage de mineurs, RGPD, base légale, AIPD | Le traitement est-il licite ? Sous quelles conditions ? |

Optionnel selon budget : un(e) conseiller(ère) Mission Locale en exercice (validité écologique : le rapport est-il utilisable en entretien ?).

---

## 2. Matériel fourni aux experts

- Le cahier des charges (`CAHIER_DES_CHARGES.md`).
- La revue de littérature (`docs/revue_litterature.md`) — à re-vérifier, pas à prendre pour argent comptant.
- Le prompt système v2 (fonction `buildSystemPrompt()` de `index.html`) : règles R1–R8 et garde-fous GF1–GF5.
- 5 à 10 rapports réels anonymisés, dont au moins un profil décrocheur, un profil de fille sur un domaine stéréotypé masculin (et inversement), un profil de milieu populaire.
- Les résultats du test Barnum (`docs/protocole_test_barnum.md`) une fois disponibles.

---

## 3. Questions explicites soumises à chaque expert

**Au psychométricien**
1. Le passage aux niveaux qualitatifs (fort/moyen/faible + preuve) au lieu des scores chiffrés suffit-il à sortir de la fausse précision ?
2. Le protocole de test Barnum est-il correctement dimensionné (seuils, taille d'échantillon, analyse) ?
3. Que reste-t-il de « Barnum » dans les formulations du rapport actuel ?

**Au psychologue de l'orientation**
4. La distinction intérêt / aptitude / adéquation est-elle correctement opérationnalisée ? Faut-il y ajouter le sentiment d'efficacité (SCCT) ?
5. La méthode « domaine → facettes → portes d'entrée » est-elle compatible avec une posture développementale (Super) ou fige-t-elle un choix ?
6. Y a-t-il un risque iatrogène (le rapport peut-il faire du mal à un profil fragile) ?

**Au sociologue de l'éducation**
7. Sur les rapports fournis : les pistes reconduisent-elles l'origine sociale ? La règle « les voies s'adaptent, pas l'ambition » est-elle réellement respectée dans les sorties ?
8. La fonctionnalité « fenêtre » ouvre-t-elle réellement, ou re-stéréotype-t-elle autrement ?
9. Quels biais de genre observez-vous dans les sorties ?

**Au DPO / CNIL** — voir `analyse_rgpd_pre_aipd.md`, à valider ou corriger.

---

## 4. Livrable attendu de chaque expert

Une **note critique écrite** (2–4 pages) structurée en : ce qui est solide / ce qui ne va pas / ce qu'il faut retirer ou corriger avant déploiement / conditions de son accord pour un usage sur mineurs. Un « avis réservé » ou « défavorable en l'état » est un résultat pleinement recevable et attendu si justifié.

---

## 5. Engagement de l'équipe produit

- Publier les avis (au moins en interne et aux partenaires pilotes) **sans les édulcorer**.
- Tenir un **registre des corrections** : pour chaque critique, la réponse apportée (corrigé / retiré / différé avec justification).
- Ne pas communiquer publiquement le caractère « validé scientifiquement » du produit tant que les avis ne le permettent pas explicitement.
