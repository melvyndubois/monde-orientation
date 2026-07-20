# Schémas JSON versionnés
*Livrable Lot 3 (ET-4 du cahier des charges)*

Deux schémas décrivent les contrats de données du moteur d'analyse :

| Fichier | Rôle | Version |
|---|---|---|
| `signaux.schema.json` | **Entrée** : signaux comportementaux extraits localement, transmis à l'IA. C'est le seul objet qui quitte le navigateur (minimisation RGPD). | v1.0.0 |
| `rapport.schema.json` | **Sortie** : rapport d'orientation produit par l'IA. v2 = **sans aucun score chiffré** (niveaux qualitatifs fort/moyen/faible + preuve). | v2.0.0 |

## Règles de versionnement

- **Incrément majeur** (v2→v3) : suppression/renommage d'un champ requis, changement de type. Casse la compatibilité.
- **Incrément mineur** : ajout d'un champ optionnel.
- Le rendu du front (`index.html`) conserve une **couche de compatibilité** lisant l'ancien schéma (`traits`→`hypotheses`, `metiers`→`pistes`, anciens `scores`) le temps de la transition.

## Validation

```bash
# Avec ajv-cli (npm i -g ajv-cli), valider un rapport exporté :
ajv validate -s schemas/rapport.schema.json -d mon_rapport.json --spec=draft7

# Ou via le petit validateur intégré :
node schemas/validate.js schemas/rapport.schema.json exemple.json
```

Un changement de code touchant la structure du rapport **doit** s'accompagner d'une mise à jour du schéma et de sa version.
