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
                "xmlns:horaire": "http://localhost:3000/data/horaire"
            });

        database.recupererToutesLesParties()
            .then(listeParties => {

            })
            .catch(errMsg => {
                console.log(errMsg);
                reject(errMsg);
            });

        database.recupererTousLesJoueurs()
            .then(listeJoueurs => {

            })
            .catch(errMsg => {
                console.log(errMsg);
                reject(errMsg);
            });

    });
};