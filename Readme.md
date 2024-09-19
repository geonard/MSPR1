# Projet Live Events Festival

## Description

Ce projet est une application mobile web dédiée au festival Live Events. Elle offre aux utilisateurs des informations sur les groupes de musique, les points d'intérêt, les alertes de sécurité, et bien plus encore. L'application est construite avec **React Native** pour le front-end et **Express.js** avec **MongoDB** pour le back-end.

## Fonctionnalités

- **Affichage des groupes de musique** : Liste des groupes avec leurs détails, incluant scène et heure de performance.
- **Points d'intérêt** : Affichage d'une carte interactive avec les points d'intérêt du festival, utilisant **Mapbox** pour une meilleure visualisation.
- **Alertes de sécurité** : Notifications en temps réel concernant la sécurité.
- **FAQ** : Section pour répondre aux questions fréquentes des visiteurs.
- **Réseaux sociaux** : Liens vers les plateformes sociales du festival.

## Technologies Utilisées

- **Front-end** : 
  - React Native
  - React Navigation
  - Axios pour les requêtes API
  - **Mapbox** pour la cartographie interactive

- **Back-end** : 
  - Express.js
  - MongoDB Atlas
  - Mongoose pour la gestion des données

- **Outils** :
  - Webpack pour la compilation
  - Babel pour la transpilation

## Pourquoi ne pas utiliser SOAP ?

Dans le cadre de ce projet, nous avons choisi de ne pas utiliser **SOAP** (Simple Object Access Protocol) pour plusieurs raisons :

1. **Complexité** : SOAP est un protocole complexe qui nécessite une configuration avancée et une gestion des erreurs plus élaborée. En revanche, les API REST sont plus simples à mettre en œuvre et à utiliser.

2. **Poids des messages** : Les messages SOAP sont souvent plus lourds à cause de leur format XML, tandis que les API REST privilégient des formats plus légers comme **JSON**, ce qui améliore les performances.

3. **Interopérabilité** : REST est largement utilisé et pris en charge par de nombreux langages de programmation et frameworks modernes, ce qui facilite l'intégration avec d'autres systèmes.

4. **Performance** : Les API REST sont généralement plus performantes, notamment pour les applications web modernes, en raison de leur architecture stateless et de leur capacité à tirer parti des caches HTTP.

## Installation

Pour démarrer le projet, suivez les étapes ci-dessous :

1. **Clonez le repository** :
   ```bash
   git clone https://github.com/geonard/mspr1.git

- **Back-end** : 
cd mspr1/backend
node server.js

- **Front-end** :
cd mspr1/frontend
npm start 