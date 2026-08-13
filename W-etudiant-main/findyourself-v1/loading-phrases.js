/**
 * Motif — Phrases d'attente pendant l'analyse
 * Modifier ce fichier librement : ajouter, supprimer, reformuler.
 * Ordre aléatoire à l'affichage, donc pas besoin de les classer.
 */

const LOADING_PHRASES = [
  // Sérieuses — insertion pro
  "75 % des métiers de 2030 n'existent pas encore. Ton profil prépare à l'inattendu.",
  "Le premier emploi n'est plus une trajectoire, c'est une expérimentation.",
  "Ce que tu fais à 23h sur ton téléphone en dit plus sur toi que ton bulletin de notes.",
  "L'orientation n'est pas un choix unique — c'est une série de décisions réversibles.",
  "Les compétences transversales (curiosité, débrouillardise, adaptabilité) sont les plus recherchées en 2026.",
  "Un tiers des alternants se voient proposer un CDI à l'issue de leur contrat.",
  "Les Missions Locales accompagnent 1,5 million de jeunes par an. Tu n'es pas seul·e.",
  "Le revenu d'engagement pour les jeunes (REJ) permet de se former tout en percevant une aide.",
  "Connaître ses forces comportementales vaut souvent plus que connaître ses notes.",
  "L'orientation par les données, c'est l'orientation par ce que tu fais — pas par ce qu'on attend de toi.",

  // Mi-sérieuses
  "Ce rapport ne remplace pas l'entretien avec ton conseiller. Il le prépare.",
  "Tes données Instagram ne mentent pas. Ton CV, parfois.",
  "La carrière idéale : quelque chose que tu ferais quand même si tu n'étais pas payé·e. Pas complètement, mais un peu.",
  "Le marché de l'emploi cherche des gens qui savent apprendre, pas des gens qui savent tout.",
  "Un parcours atypique est souvent un avantage — à condition de savoir le raconter.",
  "Spoiler : la 'voie royale' est beaucoup moins royale qu'avant.",

  // Légères / décalées
  "En train de transformer 8000 likes en conseils de carrière. C'est de la magie, ou presque.",
  "L'algorithme réfléchit. Toi aussi, d'ailleurs, c'est le moment.",
  "Analyse en cours… (pas de panique, c'est normal que ça prenne du temps)",
  "Fun fact : le terme 'orientation professionnelle' date de 1908. L'IA, c'est plus récent.",
];

// Ne pas modifier cette ligne — elle rend les phrases accessibles à l'app
if (typeof window !== "undefined") window.LOADING_PHRASES = LOADING_PHRASES;
