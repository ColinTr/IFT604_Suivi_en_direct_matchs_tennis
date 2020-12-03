const {create, fragment} = require('xmlbuilder2');
const database = require('../database');

function createPageHoraire(idPartie) {
    return new Promise((resolve, reject) => {
        database.recupererPartieViaId(idPartie)
            .then(partie => {
                const root = create({version: '1.0'})
                    .ele('rdf:RDF', {
                        "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xmlns:horaire": "http://localhost:3000/data/horaire"
                    })
                    .import(createHoraireFragment(partie));
                resolve(root.end({prettyPrint: true}));
            })
            .catch(errMsg => {
                console.log(errMsg);
                reject(errMsg);
            });
    });
}

function createListeHoraires() {
    return new Promise((resolve, reject) => {
        database.recupererToutesLesParties()
            .then(listeParties => {
                const root = create({version: '1.0'})
                    .ele('rdf:RDF', {
                        "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xmlns:horaire": "http://localhost:3000/data/horaire"
                    });
                listeParties.forEach(function (partie) {
                    root.import(createHoraireFragment(partie));
                });
                resolve(root.end({prettyPrint: true}));
            })
            .catch(errMsg => {
                console.log(errMsg);
                reject(errMsg);
            });
    });
}

function createHoraireFragment(partie) {
    const frag = fragment();
    frag.ele('rdf:Description', {'rdf:about': 'http://localhost:3000/data/horaire/' + partie.id_partie})
        .ele('horaire:datetime_debut_partie').txt(partie.datetime_debut_partie).up()
        .ele('horaire:partie', {'rdf:resource': 'http://localhost:3000/data/partie/' + partie.id_partie}).up()
        .ele('horaire:joueur1', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_1}).up()
        .ele('horaire:joueur2', {'rdf:resource': 'http://localhost:3000/data/joueur/' + partie.id_joueur_2}).up()
        .end();
    return frag;
}

module.exports = {createPageHoraire, createListeHoraires, createHoraireFragment};