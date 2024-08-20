<h1 align="center">
  KoBoard
</h1>

<p align="center">
 Application designed to facilitate the management of a shared living space.
 It integrates note sharing, shopping list management, calendar synchronization, chat, budget tracking, task assignment, and music playback.
</p>

<div align="center">
 
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>


## 🔍 Overview

This project was developed as part of the course "<i>IFT 717 - Applications Internet & Mobilité</i>".

The project architecture consists of:

1. A backend server using Express.js
2. A web application built with React.js
3. An Android mobile application

The backend server interacts with a MongoDB database hosted on a VPS and connects with various commercial APIs such as Spotify, Geonames, and Google Calendar.


## 🏗️ Project structure

### 1. Express.js backend server

The backend server is built using Express.js and serves as the central hub for data management and API communication.
It uses asynchronous JavaScript with promises to handle database access and API calls efficiently.
It is structured using the Route-Controller-Services architecture.


### 2. React.js web application

The web application is built using React and provides a responsive interface for the following functionalities:

- <b>Home:</b> Integrated Spotify web player.
- <b>Konotes:</b> Shared note-taking with user tagging.
- <b>Kourses:</b> Shared shopping lists.
- <b>Kotemps:</b> Google Calendar integration.
- <b>Kochat:</b> Real-time chat using socket.io.
- <b>Kognotte:</b> Budget management.
- <b>Koulette:</b> Task assignment roulette.
- <b>Kusique:</b> Spotify integration with geolocation-based playlist.

#### OAuth Authentication

OAuth authentication is implemented to allow users to log in using their Google accounts. The process involves token validation and redirection to ensure secure access.


### 3. Android application

The Android application mirrors the functionalities of the web application, including login, notes, chat, ...


## 💻 Installation 

### Backend server

1. Clone the repository.
2. Navigate to the <i>serveur_node_js</i> directory.
3. Install dependencies: `npm install`
4. Start the server: `npm start`

### Web application

1. Navigate to the <i>serveur_react</i> directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Android application

1. Open the project in [Android Studio](https://developer.android.com/studio).
2. Sync the project with Gradle files.
3. Run the application on an emulator or physical device.


## 📂 Directory structure

    ├── application_android         <- The android Android client application
    │   └── app.src
    │       ├── androidTest
    │       └── main.java.com.example.tennisbet
    │           |   ├── activities
    │           |   ├── httpUtils
    │           |   ├── modele
    │           |   └── services
    │           └── test
    │
    ├── serveur_node_js             <- The Express.js server (our API)
    │   ├── README.md               <- This file contains the instructions for using our
    │   ├── bin                        API in the context of TP3 (Semantic Web Client)
    │   └── src
    │       ├── modeles
    │       ├── routes
    │       ├── utils
    │       |   └── rdfUtils
    │       └── views
    │
    ├── serveur_react               <- The React.js web page client
    │   ├── README.md
    │   ├── public
    │   └── src
    │       ├── assets
    │       ├── components
    │       ├── notification
    │       └── routes
