/* Généré depuis Data/referentiel_formations_cpf.json — ne pas éditer à la main. */
window.REFERENTIEL_CPF = {
  "meta": {
    "nom": "Référentiel formations éligibles CPF — parcours adultes en reconversion",
    "version": "0.1",
    "date": "2026-07",
    "statut": "AMORCE À VÉRIFIER — ne pas utiliser en production sans contrôle RNCP/France Compétences à jour",
    "description": "Formations certifiantes finançables par le CPF, mappées sur les univers du référentiel domaines/métiers. Sert au parcours adulte (levier CPF). Chaque certification doit pointer vers une fiche RNCP vérifiée avant intégration en production.",
    "sources": [
      { "nom": "France Compétences / RNCP", "url": "https://www.francecompetences.fr", "usage": "éligibilité et code RNCP" },
      { "nom": "Mon Compte Formation", "url": "https://www.moncompteformation.gouv.fr", "usage": "recherche et financement" },
      { "nom": "France VAE", "url": "https://vae.gouv.fr", "usage": "validation des acquis de l'expérience" }
    ],
    "regles": [
      "Toute certification doit avoir un code RNCP actif vérifié avant production (les codes ci-dessous sont indicatifs / à confirmer).",
      "La VAE est systématiquement mentionnée comme voie alternative pour les adultes ayant de l'expérience.",
      "Ne jamais figer un coût : le CPF finance selon les droits acquis, montant variable.",
      "Éthique (EJ-5) : un partenariat avec un organisme ne modifie jamais le classement des recommandations."
    ]
  },
  "formations": [
    {
      "univers": 1,
      "domaine": "véhicules / mécanique",
      "intitule": "Titre professionnel Mécanicien(ne) automobile",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "3 (CAP)",
      "duree_indicative": "8-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 2,
      "domaine": "construction / électricité",
      "intitule": "Titre professionnel Électricien(ne) d'équipement du bâtiment",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "3 (CAP)",
      "duree_indicative": "7-10 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 2,
      "domaine": "bois / menuiserie",
      "intitule": "Titre professionnel Menuisier(ère) d'agencement",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "3 (CAP)",
      "duree_indicative": "8-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 3,
      "domaine": "cuisine / restauration",
      "intitule": "CAP Cuisine (candidat libre ou formation continue)",
      "certificateur": "Éducation nationale",
      "rncp": "à vérifier",
      "niveau": "3 (CAP)",
      "duree_indicative": "6-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 3,
      "domaine": "pâtisserie",
      "intitule": "CAP Pâtissier (formation continue)",
      "certificateur": "Éducation nationale",
      "rncp": "à vérifier",
      "niveau": "3 (CAP)",
      "duree_indicative": "6-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 4,
      "domaine": "graphisme / design",
      "intitule": "Titre professionnel Infographiste metteur en page / Designer web",
      "certificateur": "Ministère du Travail / organismes privés",
      "rncp": "à vérifier",
      "niveau": "4-5 (Bac / Bac+2)",
      "duree_indicative": "6-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 5,
      "domaine": "code / développement",
      "intitule": "Titre professionnel Développeur web et web mobile",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "5 (Bac+2)",
      "duree_indicative": "8-14 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 5,
      "domaine": "data / IA",
      "intitule": "Certification Data Analyst",
      "certificateur": "organismes privés certifiés",
      "rncp": "à vérifier",
      "niveau": "6 (Bac+3/4)",
      "duree_indicative": "6-12 mois",
      "eligible_cpf": true,
      "vae_possible": false
    },
    {
      "univers": 6,
      "domaine": "sport / fitness",
      "intitule": "BPJEPS Activités de la Forme",
      "certificateur": "Ministère des Sports",
      "rncp": "à vérifier",
      "niveau": "4 (Bac)",
      "duree_indicative": "9-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 7,
      "domaine": "beauté / coiffure",
      "intitule": "CAP Coiffure (formation continue) / CAP Esthétique",
      "certificateur": "Éducation nationale",
      "rncp": "à vérifier",
      "niveau": "3 (CAP)",
      "duree_indicative": "8-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 8,
      "domaine": "nature / animaux",
      "intitule": "Titre / BP Éducateur canin, formations soigneur animalier",
      "certificateur": "organismes spécialisés",
      "rncp": "à vérifier",
      "niveau": "3-4",
      "duree_indicative": "variable",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 9,
      "domaine": "soin / aide à la personne",
      "intitule": "Diplôme d'État Aide-soignant(e)",
      "certificateur": "Ministère de la Santé",
      "rncp": "à vérifier",
      "niveau": "4",
      "duree_indicative": "11-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 9,
      "domaine": "petite enfance",
      "intitule": "CAP Accompagnant Éducatif Petite Enfance (AEPE)",
      "certificateur": "Éducation nationale",
      "rncp": "à vérifier",
      "niveau": "3 (CAP)",
      "duree_indicative": "9-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 12,
      "domaine": "commerce / vente",
      "intitule": "Titre professionnel Conseiller(ère) de vente / Négociateur technico-commercial",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "4 (Bac)",
      "duree_indicative": "6-10 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 12,
      "domaine": "immobilier",
      "intitule": "BTS Professions Immobilières / titres pro immobilier",
      "certificateur": "Éducation nationale / privés",
      "rncp": "à vérifier",
      "niveau": "5 (Bac+2)",
      "duree_indicative": "variable",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 12,
      "domaine": "gestion / management",
      "intitule": "Titre professionnel Gestionnaire de paie / Assistant(e) RH",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "5 (Bac+2)",
      "duree_indicative": "6-10 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 13,
      "domaine": "sécurité",
      "intitule": "Titre à Finalité Professionnelle Agent de prévention et de sécurité (TFP APS)",
      "certificateur": "branche sécurité privée",
      "rncp": "à vérifier",
      "niveau": "3",
      "duree_indicative": "1-2 mois",
      "eligible_cpf": true,
      "vae_possible": false
    },
    {
      "univers": 14,
      "domaine": "industrie / maintenance",
      "intitule": "Titre professionnel Technicien(ne) de maintenance industrielle",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "4 (Bac)",
      "duree_indicative": "9-12 mois",
      "eligible_cpf": true,
      "vae_possible": true
    },
    {
      "univers": 1,
      "domaine": "conduite / transport",
      "intitule": "Titre professionnel Conducteur(trice) routier(ère) de marchandises",
      "certificateur": "Ministère du Travail",
      "rncp": "à vérifier",
      "niveau": "3",
      "duree_indicative": "3-6 mois",
      "eligible_cpf": true,
      "vae_possible": true
    }
  ]
};
