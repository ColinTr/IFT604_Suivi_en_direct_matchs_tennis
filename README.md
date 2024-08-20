# Introduction
Ce projet a été réalisé dans le cadre du cours IFT717 - Applications Internet & Mobilité.<br/>
Notre groupe est constitué de :
 - Colin Troisemaine
 - Quentin Levieux
 - Alexandre Turpin
 - Adrien Verdier

# Structure du projet

    ├── README.md                   <- Le README du plus haut niveau qui décrit la structure du projet
    │
    ├── application_android         <- Le projet du client Android
    │   └── app.src
    │       ├── androidTest
    │       └── main.java.com.example.tennisbet
    │           |   ├── activities
    │           |   ├── httpUtils
    │           |   ├── modele
    │           |   └── services
    │           └── test
    │
    ├── serveur_node_js             <- Le serveur express (notre API)
    │   ├── README.md               <- Ce fichier contient les instructions pour l'utilisation de notre
    │   ├── bin                        API dans le cadre du TP3 (Client Web Sémantique)
    │   └── src
    │       ├── modeles
    │       ├── routes
    │       ├── utils
    │       |   └── rdfUtils
    │       └── views
    │
    ├── serveur_react               <- Le client Web
    │   ├── README.md
    │   ├── public
    │   └── src
    │       ├── assets
    │       ├── components
    │       ├── notification
    │       └── routes
