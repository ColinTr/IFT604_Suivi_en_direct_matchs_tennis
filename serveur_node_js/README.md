## Avertissement
Le code ci-présenté n'est en aucun cas sécuritaire et ne devrait pas être utilisé pour une vrai application de commerce électronique.

## Fonctionnement
Le serveur est conçu pour fonctionner de façon indépendante de tout client, selon l'architecture REST.

Le serveur est programmé avec `Node.js` et le framework `express.js`. Pour le lancer, il faut d'abord récupérer les modules de nodes avec la commande à partir du dossier racine:
```
    npm install
```
Puis, le serveur se lance avec la commande:
```
    npm start
```
## Les URIs du client sémantique
Un certain nombre de ressources est accessible via les URIs suivantes (toutes ces URIs supportent le html et le rdf+xml):<br/>
CHECK THIS : https://fr.wikipedia.org/wiki/RDF_Schema

| URI                                     | Description                                                  |
|-----------------------------------------|--------------------------------------------------------------|
| http://localhost:3000/data              | Page explicitant comment utiliser notre API                  |
| http://localhost:3000/data/horaire      | Tableau contenant l'horaire des parties                      |
| http://localhost:3000/data/horaire/*id* | Page contenant l'horaire de la partie à l'id spécifié        |
| http://localhost:3000/data/partie       | Tableau contenant la liste des partie                        |
| http://localhost:3000/data/partie/*id*  | Page contenant les informations d'une partie à l'id spécifié | => Avec lien vers les joueurs****
| http://localhost:3000/data/joueur       | Tableau contenant la liste des joueurs                       |
| http://localhost:3000/data/joueur/*id*  | Page contenant les informations d'un joueur                  | => Est-ce qu'on y met aussi les liens vers les parties qu'il a jouées ?