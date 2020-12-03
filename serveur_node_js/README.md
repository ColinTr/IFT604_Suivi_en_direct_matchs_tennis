# Avertissement
Le code ci-présenté n'est en aucun cas sécuritaire et ne devrait pas être utilisé pour une vrai application de commerce électronique.

# Fonctionnement
Le serveur est conçu pour fonctionner de façon indépendante de tout client, selon l'architecture REST.

Le serveur est programmé avec `Node.js` et le framework `express.js`. Pour le lancer, il faut d'abord récupérer les modules de nodes avec la commande à partir du dossier racine:
```
    npm install
```
Puis, le serveur se lance avec la commande:
```
    npm start
```
La base de données est une base SQLite qui se présente sous forme de fichier, il n'est donc pas nécessaire de démarrer de BDD pour qu'elle fonctionne.
# Les URIs du client sémantique
 
### Requêtes supportées :
Toutes les URIs du tableau ci-dessous supportent le HTML et le RDF.<br/>
Conformément aux consignes, les requêtes sur ces URIs doivent comporter la clé "<b>Accept</b>" dans leur header avec les valeurs "<b>text/html</b>" ou "<b>application/rdf+xml</b>".<br/>
La réponse de ce serveur express aura quand à elle la clé "Content-Type" dans son header avec les mêmes valeurs "text/html" ou "application/rdf+xml"

### Liste des URIs disponibles :

| URI                                            | Description                                                  |
|------------------------------------------------|--------------------------------------------------------------|
| http://localhost:3000/data                     | Version HTML = Page expliquant comment utiliser l'API        |
|                                                | Version RDF  = L'ensemble des données de l'application       |
| http://localhost:3000/data/horaire             | Tableau contenant l'horaire des parties                      |
| http://localhost:3000/data/horaire/*id_partie* | Page contenant l'horaire de la partie à l'id spécifié        |
| http://localhost:3000/data/partie              | Tableau contenant la liste des partie                        |
| http://localhost:3000/data/partie/*id_partie*  | Page contenant les informations d'une partie à l'id spécifié |
| http://localhost:3000/data/joueur              | Tableau contenant la liste des joueurs                       |
| http://localhost:3000/data/joueur/*id_joueur*  | Page contenant les informations d'un joueur                  |

### Exemples de requêtes :

Afin de tester, la BDD comporte les identifiants suivants : <br/>
 \- id_partie : 83<br/>
 \- id_joueur : 1 ou 2<br/>
 On peut donc envoyer une requête sur http://localhost:3000/data/horaire/83 ou http://localhost:3000/data/joueur/1<br/>
Comme expliqué ci-dessus, ces requêtes devront posséder une header avec la clé "<b>Accept</b>" et les valeurs "<b>text/html</b>" ou "<b>application/rdf+xml</b>".