const {create} = require('xmlbuilder2');
const database = require('../database');

// Route /data/horaire/:id_partie
exports.createPageHoraire = function createPageHoraire(idPartie) {
    return new Promise(((resolve, reject) => {
        database.recupererPartieViaId(idPartie)
            .then(partie => {
                const root = create({version: '1.0'})
                    .ele('rdf:RDF', {
                        "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xmlns:horaire": "http://localhost:3000/data/horaire",
                        "xmlns:partie": "http://localhost:3000/data/partie",
                        "xmlns:joueur": "http://localhost:3000/data/joueur"
                    })
                    .ele('rdf:Description', {'rdf:about': 'http://localhost:3000/data/horaire/' + idPartie})
                    .ele('horaire:datetime_debut_partie').txt(partie.datetime_debut_partie).up()
                    .ele('horaire:partie', {'rdf:resource': 'http://localhost:3000/data/partie/' + idPartie}).up()
                    .ele('horaire:joueur1', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_1}).up()
                    .ele('horaire:joueur2', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_2}).up()
                    .up()
                    .up();
                resolve(root.end({prettyPrint: true}));
            })
            .catch(errmsg => {
                reject(errmsg);
            });
    }));
};

// Route /data/horaire
exports.createListeHoraires = function createListeHoraires() {
    return new Promise(((resolve, reject) => {
        database.recupererToutesLesParties()
            .then(listeParties => {
                const root = create({version: '1.0'})
                    .ele('rdf:RDF', {
                        "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xmlns:horaire": "http://localhost:3000/data/horaire",
                        "xmlns:partie": "http://localhost:3000/data/partie",
                        "xmlns:joueur": "http://localhost:3000/data/joueur"
                    });
                listeParties.forEach(function(partie) {
                    console.log("horaire");
                    root.ele('rdf:Description', {'rdf:about': 'http://localhost:3000/data/horaire/' + partie.id_partie})
                        .ele('horaire:datetime_debut_partie').txt(partie.datetime_debut_partie).up()
                        .ele('horaire:partie', {'rdf:resource': 'http://localhost:3000/data/partie/' + partie.id_partie}).up()
                        .ele('horaire:joueur1', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_1}).up()
                        .ele('horaire:joueur2', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_2}).up()
                        .up()
                });
                root.up();
                resolve(root.end({prettyPrint: true}));
            })
            .catch(errmsg => {
                reject(errmsg);
            });
    }));
};