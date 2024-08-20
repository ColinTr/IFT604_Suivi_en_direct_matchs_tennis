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

Our team of developers was composed of:
 - Colin Troisemaine
 - Quentin Levieux
 - Alexandre Turpin
 - Adrien Verdier


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
