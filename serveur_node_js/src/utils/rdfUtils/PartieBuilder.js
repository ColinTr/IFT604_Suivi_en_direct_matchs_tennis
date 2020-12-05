const {create, fragment} = require('xmlbuilder2');
const database = require('../database');

function createPagePartie(idPartie) {
    return new Promise((resolve, reject) => {
        database.recupererPartieViaId(idPartie)
            .then(partie => {
                if (partie === undefined) {
                    return resolve("Aucune partie avec l'id spécifié")
                }

                const root = create({version: '1.0'})
                    .ele('rdf:RDF', {
                        "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xmlns:partie": "http://localhost:3000/data/partie"
                    })
                    .import(createPartieFragment(partie));
                resolve(root.end({prettyPrint: true}));
            })
            .catch(errMsg => {
                reject(errMsg);
            });
    });
}

function createListeParties() {
    return new Promise((resolve, reject) => {
        database.recupererToutesLesParties()
            .then(listeParties => {
                const root = create({version: '1.0'})
                    .ele('rdf:RDF', {
                        "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xmlns:partie": "http://localhost:3000/data/partie"
                    });
                listeParties.forEach(function (partie) {
                    root.import(createPartieFragment(partie));
                });
                resolve(root.end({prettyPrint: true}));
            })
            .catch(errMsg => {
                reject(errMsg);
            });
    });
}

function createPartieFragment(partie) {
    const frag = fragment();
    frag.ele('rdf:Description', {'rdf:about': 'http://localhost:3000/data/partie/' + partie.id_partie})
        .ele('partie:datetime_debut_partie').txt(partie.datetime_debut_partie).up()
        .ele('partie:datetime_fin_partie').txt(partie.datetime_fin_partie).up()
        .ele('partie:score_manche_joueur_1').txt(partie.score_manche_joueur_1).up()
        .ele('partie:score_manche_joueur_2').txt(partie.score_manche_joueur_2).up()
        .ele('partie:duree_partie').txt(partie.duree_partie).up()
        .ele('partie:etat_partie').txt(partie.etat_partie).up()
        .ele('partie:horaire', {'rdf:resource': 'http://localhost:3000/data/horaire/' + partie.id_partie}).up()
        .ele('partie:joueur1', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_1}).up()
        .ele('partie:joueur2', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_2}).up();
    return frag;
}

module.exports = {createPagePartie, createListeParties, createPartieFragment};