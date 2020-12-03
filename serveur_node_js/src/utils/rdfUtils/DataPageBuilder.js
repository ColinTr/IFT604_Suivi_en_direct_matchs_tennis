const {create} = require('xmlbuilder2');
const database = require('../database');
const PartieBuilder = require('./PartieBuilder');
const JoueurBuilder = require('./JoueurBuilder');
const HoraireBuilder = require('./HoraireBuilder');

exports.createPageData = function createPageData() {
    return new Promise((resolve, reject) => {
        const root = create({version: '1.0'})
            .ele('rdf:RDF', {
                "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "xmlns:horaire": "http://localhost:3000/data/horaire",
                "xmlns:joueur": "http://localhost:3000/data/joueur",
                "xmlns:partie": "http://localhost:3000/data/partie"
            });

        const promises = [];

        promises.push(
            new Promise((resolve1, reject1) => {
                database.recupererToutesLesParties()
                    .then(listeParties => {
                        listeParties.forEach(function (partie) {
                            root.import(PartieBuilder.createPartieFragment(partie));
                        });

                        listeParties.forEach(function (partie) {
                            root.import(HoraireBuilder.createHoraireFragment(partie));
                        });

                        resolve1()
                    })
                    .catch(errMsg => {
                        console.log(errMsg);
                        reject1(errMsg);
                    });
            })
        );

        promises.push(
            new Promise((resolve1, reject1) => {
                database.recupererTousLesJoueurs()
                    .then(listeJoueurs => {
                        const joueurPromises = [];

                        listeJoueurs.forEach(function (joueur) {
                            joueurPromises.push(
                                JoueurBuilder.createJoueurFragment(joueur)
                                    .then(fragment => {
                                        root.import(fragment);
                                    })
                            );
                        });

                        Promise.allSettled(joueurPromises)
                            .then(() => {
                                resolve1();
                            });
                    })
                    .catch(errMsg => {
                        console.log(errMsg);
                        reject1(errMsg);
                    });
            }));

        Promise.allSettled(promises)
            .then(() => {
                resolve(root.end({prettyPrint: true}));
            })
            .catch(errMsg => {
                console.log(errMsg);
                reject(errMsg);
            });
    });
};