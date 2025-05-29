# PoC Chat Support Client - Spring Boot & Angular

## 📋 Description

Cette preuve de concept (PoC) démontre un système de chat en temps réel entre un client et un agent du service client pour une application de location de véhicules, utilisant Spring Boot pour le backend et Angular pour le frontend.

## 🚀 Technologies utilisées

### Backend
- **Spring Boot 3.2** avec Java 17
- **Spring Web** pour les API REST
- **Spring WebSocket** avec STOMP pour la communication temps réel
- **Spring Data JPA** pour la persistance
- **Base de données Mysql** 
- **Maven** pour la gestion des dépendances

### Frontend
- **Angular 17** avec TypeScript
- **Angular Material** pour l'interface utilisateur
- **RxJS** pour la programmation réactive
- **STOMP.js** pour les WebSockets
- **SockJS** pour la compatibilité WebSocket

## ✨ Fonctionnalités

- ✅ Chat en temps réel entre client et agent
- ✅ Sauvegarde des messages en base de données MySQL
- ✅ Interface Material Design avec toggle client/agent
- ✅ Communication WebSocket avec STOMP
- ✅ Horodatage des messages
- ✅ Auto-scroll vers les nouveaux messages
- ✅ Indicateur de statut de connexion
- ✅ API REST pour la gestion des messages

## 🛠️ Installation et lancement

### Prérequis
- Java 17+
- Node.js 18+
- Maven 3.6+
- npm ou yarn

### Backend (Spring Boot)

1. **Aller dans le dossier backend**
   ```bash
   cd backend
   ```

2. **Compiler et lancer le backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

Le backend sera disponible sur http://localhost:8080

### Frontend (Angular)

1. **Aller dans le dossier frontend**
   ```bash
   cd frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le frontend**
   ```bash
   npm start
   ```

Le frontend sera disponible sur http://localhost:4200

## 🧪 Comment tester la PoC

1. **S'assurer que le backend est lancé** (port 8080)
2. **S'assurer que le frontend est lancé** (port 4200)
3. **Ouvrir deux onglets** sur http://localhost:4200
4. **Dans le premier onglet** : sélectionner "Client"
5. **Dans le second onglet** : sélectionner "Agent Support"
6. **Envoyer des messages** depuis chaque onglet
7. **Observer** la communication en temps réel

## 📁 Structure du projet

   ```
chat-springboot-angular/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/chatpoc/
│   │   ├── ChatPocApplication.java   # Classe principale
│   │   ├── model/
│   │   │   └── Message.java          # Entité Message
│   │   ├── repository/
│   │   │   └── MessageRepository.java # Repository JPA
│   │   ├── service/
│   │   │   └── MessageService.java   # Service métier
│   │   ├── controller/
│   │   │   └── MessageController.java # Contrôleur REST
│   │   ├── dto/
│   │   │   ├── MessageRequest.java   # DTO pour les requêtes
│   │   │   └── ApiResponse.java      # DTO pour les réponses
│   │   └── config/
│   │       └── WebSocketConfig.java  # Configuration WebSocket
│   ├── src/main/resources/
│   │   └── application.properties    # Configuration Spring
│   └── pom.xml                       # Dépendances Maven
├── frontend/                         # Angular Frontend
│   ├── src/app/
│   │   ├── components/chat/          # Composant de chat
│   │   ├── services/                 # Services Angular
│   │   ├── models/                   # Modèles TypeScript
│   │   └── app.module.ts            # Module principal
│   ├── package.json                  # Dépendances npm
│   └── angular.json                  # Configuration Angular
└── README.md
   ```

## 🗄️ Structure de la base de données

### Table `messages`
| Colonne   | Type               | Description                        |
| --------- | ------------------ | ---------------------------------- |
| id        | BIGINT PRIMARY KEY | Identifiant unique auto-incrémenté |
| sender    | VARCHAR(10)        | 'client' ou 'agent'                |
| content   | TEXT               | Contenu du message                 |
| timestamp | TIMESTAMP          | Date et heure de création          |

## 🔧 API Endpoints

### GET /api/messages
Récupère tous les messages triés par timestamp
   ```json
{
  "success": true,
  "message": "Succès",
  "data": [...]
}
   ```

### POST /api/messages
Crée un nouveau message
   ```json
{
  "sender": "client|agent",
  "content": "Contenu du message"
}
   ```

## 🌐 WebSocket Configuration

### Endpoint STOMP
- **URL**: `ws://localhost:8080/ws`
- **Topic**: `/topic/messages`
- **Protocol**: STOMP over SockJS

### Events
- **Subscription**: `/topic/messages` - Reçoit les nouveaux messages
- **Publication**: Automatique via l'API REST
