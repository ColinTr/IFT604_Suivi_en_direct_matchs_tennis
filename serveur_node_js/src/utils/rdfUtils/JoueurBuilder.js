const {create} = require('xmlbuilder2');
const database = require('../database');

exports.createPageJoueur = function createPageJoueur(idJoueur) {
    console.log(idJoueur);
    return new Promise((resolve, reject) => {
        database.trouverJoueurViaIdJoueur(idJoueur)
            .then(joueur => {
                console.log(joueur);
                const root = create({version: '1.0'})
                    .ele('rdf:RDF', {
                        "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xmlns:joueur": "http://localhost:3000/data/joueur"
                    }).ele('rdf:Description', {'rdf:about': 'http://localhost:3000/data/joueur/' + joueur.id_joueur})
                    .ele('joueur:nom').txt(joueur.nom).up()
                    .ele('joueur:prenom').txt(joueur.prenom).up()
                    .ele('joueur:age').txt(joueur.age).up()
                    .ele('joueur:rang').txt(joueur.rang).up()
                    .ele('joueur:pays').txt(joueur.pays).up()
                    .ele('joueur:parties')
                    .ele('rdf:Bag');
                database.recupererToutesLesPartiesDuJoueur(joueur.id_joueur)
                    .then(listeParties => {
                        listeParties.forEach(function (partie) {
                            root.ele('rdf:li', {'rdf:resource': 'http://localhost:3000/data/partie/' + partie.id_partie}).up();
                        });
                        resolve(root.end({prettyPrint: true}));
                    })
                    .catch(errMsg => {
                        console.log(errMsg);
                        reject(errMsg);
                    });
            })
            .catch(errMsg => {
                console.log(errMsg);
                reject(errMsg);
            });
    });
};

exports.createListeJoueurs = function createListeJoueurs() {
    // TODO
    return null;
};