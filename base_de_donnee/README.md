# 📁 Base de Données – Projet Plateforme de Location de Véhicules

Ce dossier contient le fichier `schema.sql`, qui définit le **schéma relationnel de la base de données** utilisé dans le cadre de la plateforme web unifiée de location de véhicules.

## 🎯 Objectif

L’objectif de cette base de données est de structurer l’ensemble des données métier du projet conformément aux **besoins fonctionnels** et aux **exigences techniques** définies dans les documents :
- **Business Requirements**
- **Architecture Definition Document**
- **Compliance Assessment**

Ce schéma soutient des cas d’usage comme :
- Inscription et gestion de profils utilisateurs
- Consultation et réservation de véhicules
- Paiement sécurisé
- Interaction avec le service client

## 📦 Fichier inclus

- `schema.sql` : script SQL de création des tables principales du projet

## 🧱 Tables définies

### `utilisateur`
Stocke les informations des clients inscrits (authentification, profil, adresse).

### `agence`
Représente les agences physiques qui proposent des véhicules à la location.

### `vehicule`
Contient les véhicules disponibles à la réservation, leur catégorie ACRISS, leur tarif et l’agence de rattachement.

### `reservation`
Enregistre les réservations faites par les utilisateurs, en lien avec un véhicule, un intervalle de temps, et un statut (confirmée, annulée, etc.).

### `paiement`
Trace les paiements associés à une réservation, leur montant, statut et date.

### `message_support`
Historise les échanges avec le service client (chat, visio, ou formulaire), pour garantir un suivi qualité.

## ✅ Conformité

- Respect des **formes normales** (modélisation relationnelle)
- Utilisation de **clés primaires** et **clés étrangères** pour assurer l’intégrité référentielle
- Préparation pour une **interopérabilité** avec le backend (API REST)
- Compatible avec les standards RGPD : séparation des données utilisateurs, journalisation possible des messages client

## 🛠️ Initialiser la base de données

### 🔵 Avec PostgreSQL

1. **Créer une base de données PostgreSQL** (si ce n’est pas déjà fait) :
   ```bash
   createdb location_voiture
   ```

2. **Exécuter le script `schema.sql`** pour créer les tables :

   ```bash
   psql -d location_voiture -f schema.sql
   ```

> Assurez-vous que PostgreSQL est bien installé et que la commande `psql` est disponible dans votre terminal.


### 🟠 Avec MySQL (adaptation nécessaire)

Le script schema.sql est conçu pour PostgreSQL. Si vous utilisez MySQL, quelques ajustements peuvent être nécessaires (types de données, syntaxe SERIAL, gestion des contraintes, etc.).

1. **Créer une base de données** :

   ```bash
   mysql -u root -p
   CREATE DATABASE location_voiture;
   ```

2. **Importer le fichier SQL (après adaptation à MySQL)** :

   ```bash
   mysql -u root -p location_voiture < schema.sql
   ```

> Pensez à adapter les types SERIAL en INT AUTO_INCREMENT, et à vérifier la compatibilité des contraintes REFERENCES.