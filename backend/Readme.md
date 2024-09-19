
### README.md pour le Back-end

```markdown
# Back-end du Projet Live Events Festival

## Description

Le back-end de l'application Live Events Festival est construit avec **Express.js** et utilise **MongoDB** pour la gestion des données. Il fournit les API nécessaires pour alimenter le front-end avec des informations sur les groupes de musique, les points d'intérêt, et les alertes de sécurité.

## Fonctionnalités

- API pour récupérer la liste des groupes de musique.
- API pour récupérer les points d'intérêt.
- API pour gérer les alertes de sécurité.
- Gestion des erreurs et des réponses appropriées.

## Installation

### Prérequis

- Node.js et npm installés sur votre machine.
- Accès à un cluster MongoDB (ex. MongoDB Atlas).

### Étapes d'installation

1. **Accédez au répertoire du back-end** :
   ```bash
   cd msprs1/backend
   npm install
   MONGODB_URI='mongodb://localhost/live-events'

   node server.js

