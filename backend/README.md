# ChâTop – Backend API

API REST de l'application **ChâTop**, développée avec NestJS dans le cadre du Projet 3 de la formation Lead Developer JavaScript d'OpenClassrooms.

ChâTop est une application de location saisonnière permettant de mettre en relation des locataires et des propriétaires dans une zone touristique.

Ce backend permet de gérer les utilisateurs, l'authentification, les locations et les messages échangés entre utilisateurs.

---

## 📋 Sommaire

- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Base de données](#-base-de-données)
- [Lancement du serveur](#-lancement-du-serveur)
- [Documentation API](#-documentation-api)
- [Authentification et sécurité](#-authentification-et-sécurité)
- [Routes disponibles](#-routes-disponibles)
- [Commandes disponibles](#-commandes-disponibles)

---

## 🛠 Technologies

- **NestJS 12** – Framework backend Node.js
- **TypeScript 6** – Langage de développement
- **Prisma 7** – ORM pour l'accès à la base de données
- **MariaDB** – Base de données relationnelle
- **Passport / JWT** – Authentification et gestion des accès
- **bcrypt** – Hachage des mots de passe
- **class-validator** – Validation des données entrantes
- **class-transformer** – Transformation des données
- **Swagger / OpenAPI** – Documentation interactive de l'API

---

## 📂 Architecture

Le backend repose sur une architecture modulaire NestJS avec une séparation des responsabilités entre les contrôleurs, les services et les repositories.

```text
backend/
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── auth/
│   ├── users/
│   ├── rentals/
│   ├── messages/
│   ├── prisma/
│   ├── app.module.ts
│   └── main.ts
│
├── .env
├── package.json
├── prisma7.config.ts
└── README.md
```

Les principaux modules sont :

| Module   | Responsabilité                                |
| -------- | --------------------------------------------- |
| Auth     | Authentification et génération des tokens JWT |
| Users    | Gestion des utilisateurs                      |
| Rentals  | Gestion des locations                         |
| Messages | Gestion des messages                          |
| Prisma   | Accès à la base de données                    |

Chaque module métier sépare les responsabilités entre :

- **Controller** : réception des requêtes HTTP et transmission des réponses.
- **Service** : gestion de la logique métier.
- **Repository** : accès aux données via Prisma.

---

## 📦 Prérequis

Avant de commencer, assurez-vous de disposer des éléments suivants :

- **Node.js** 22 LTS ou supérieur
- **npm**
- **MariaDB** compatible avec l'adaptateur Prisma utilisé
- **Git**

---

## 🚀 Installation

### 1. Cloner le repository

Depuis le terminal :

```bash
git clone <url-du-repository>
cd <nom-du-repository>/backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du dossier `backend` à l'aide du fichier `.env.example`.

```bash
cp .env.example .env
```

Renseigner les variables nécessaires à la connexion à la base de données et à l'authentification.

Voir la section [Configuration](#-configuration).

### 4. Générer le client Prisma

```bash
npx prisma generate
```

Cette commande génère le client Prisma à partir du schéma défini dans `prisma/schema.prisma`.

---

## ⚙️ Configuration

Le backend utilise des variables d'environnement pour gérer les paramètres de connexion à la base de données et les informations sensibles.

Créer un fichier `.env` à la racine du backend à l'aide du fichier `.env.example`.

Adapter les valeurs à votre environnement local.

**Sécurité :**

- Le fichier `.env` ne doit jamais être versionné.
- Le secret JWT doit être suffisamment robuste.
- Les identifiants de connexion à la base de données ne doivent jamais être exposés.

---

## 🗄 Base de données

L'application utilise **MariaDB** avec **Prisma 7** comme ORM.

### Structure de la base de données

La base repose sur trois entités principales :

| Entité     | Description                                    |
| ---------- | ---------------------------------------------- |
| `users`    | Informations des utilisateurs et propriétaires |
| `rentals`  | Informations relatives aux locations           |
| `messages` | Messages échangés entre utilisateurs           |

### Relations

- Un utilisateur peut posséder plusieurs locations.
- Une location appartient à un utilisateur.
- Une location peut recevoir plusieurs messages.
- Un utilisateur peut envoyer plusieurs messages.
- Chaque message est associé à un utilisateur et à une location.

### Initialisation

Le schéma initial de la base de données est fourni dans les ressources du projet OpenClassrooms.

Pour initialiser la base :

1. Créer une base de données nommée `chatop_db` dans MariaDB.
2. Importer le fichier SQL fourni dans le dossier `ressources/sql` du repository.
3. Configurer la variable `DATABASE_URL` dans le fichier `.env`.
4. Générer le client Prisma :

```bash
npx prisma generate
```

Le schéma Prisma est défini dans `prisma/schema.prisma`.

La configuration de Prisma 7 est définie dans `prisma.config.ts`.

**À noter :** le projet utilise le schéma SQL initial fourni avec le projet OpenClassrooms. Aucune migration Prisma n'est actuellement utilisée.

---

## ▶️ Lancement du serveur

Depuis le dossier `backend` :

### Mode développement

```bash
npm run start:dev
```

Le serveur démarre en mode développement avec rechargement automatique.

### Mode production

Compiler le projet :

```bash
npm run build
```

Démarrer le serveur :

```bash
npm run start:prod
```

Par défaut, l'API est accessible à l'adresse :

http://localhost:3000

---

## 📖 Documentation API

L'API est documentée avec **Swagger / OpenAPI** grâce au package `@nestjs/swagger`.

Une fois le serveur démarré, la documentation interactive est accessible à l'adresse :

**http://localhost:3000/api**

Swagger permet de :

- Consulter les routes disponibles.
- Visualiser les paramètres et les DTOs attendus.
- Consulter les réponses HTTP.
- Tester directement les endpoints.
- Renseigner un token JWT pour tester les routes protégées.

---

## 🔐 Authentification et sécurité

L'API utilise une authentification basée sur **JWT (JSON Web Token)**.

### Fonctionnement

1. L'utilisateur crée un compte ou se connecte.
2. Le serveur vérifie les identifiants.
3. Le mot de passe est vérifié à partir de son hash stocké en base de données.
4. En cas de connexion réussie, un token JWT est généré.
5. Ce token doit être transmis dans l'en-tête `Authorization` pour accéder aux routes protégées.

Format attendu :

```text
Authorization: Bearer <token>
```

### Mesures de sécurité

- Hachage des mots de passe avec bcrypt.
- Authentification JWT avec Passport.
- Protection des routes privées à l'aide de Guards NestJS.
- Validation des données entrantes avec class-validator.
- Rejet des propriétés non autorisées dans les requêtes grâce à la configuration globale de `ValidationPipe`.
- Utilisation de variables d'environnement pour les informations sensibles.

---

## 🏠 Routes disponibles

Toutes les routes de l'API sont accessibles sous le préfixe `/api`.

### Authentification

| Méthode | Route                | Description                                          |
| ------- | -------------------- | ---------------------------------------------------- |
| POST    | `/api/auth/register` | Créer un compte utilisateur                          |
| POST    | `/api/auth/login`    | Authentifier un utilisateur                          |
| GET     | `/api/auth/me`       | Récupérer les informations de l'utilisateur connecté |

### Locations

| Méthode | Route              | Description                                |
| ------- | ------------------ | ------------------------------------------ |
| GET     | `/api/rentals`     | Récupérer toutes les locations             |
| GET     | `/api/rentals/:id` | Récupérer une location par son identifiant |
| POST    | `/api/rentals`     | Créer une location                         |
| PUT     | `/api/rentals/:id` | Modifier une location                      |

### Utilisateurs

| Méthode | Route           | Description                                 |
| ------- | --------------- | ------------------------------------------- |
| GET     | `/api/user/:id` | Récupérer les informations d'un utilisateur |

### Messages

| Méthode | Route           | Description                                |
| ------- | --------------- | ------------------------------------------ |
| POST    | `/api/messages` | Envoyer un message concernant une location |

Les détails des paramètres, des corps de requêtes, des réponses et des éventuelles erreurs HTTP sont consultables dans la documentation Swagger.

---

## 🧰 Commandes disponibles

Les commandes suivantes sont définies dans le `package.json` du backend.

| Commande              | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `npm run start`       | Démarrer le serveur                                     |
| `npm run start:dev`   | Démarrer en développement avec rechargement automatique |
| `npm run start:debug` | Démarrer en mode debug                                  |
| `npm run build`       | Compiler le projet                                      |
| `npm run start:prod`  | Démarrer le serveur compilé                             |
| `npm run format`      | Formater les fichiers TypeScript avec Prettier          |
| `npm run lint`        | Analyser le code avec Oxlint                            |
| `npx prisma generate` | Générer le client Prisma                                |
