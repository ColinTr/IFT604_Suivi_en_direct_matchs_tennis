/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const generateur = require('../utils/generateur');
const database = require('../utils/database');
const Partie = require('../modeles/partie');
const dateTimeUtils = require('../utils/dateTimeUtils');
const Erreur = require('../utils/erreur');
const ModeleSerializable = require('../modeles/SerializableClasses');

// GET la liste des parties du jour
router.get('/', function (req, res) {
    database.recupererToutesLesPartiesDuJour()
        .then(partiesDuJour => {
            let serializablePartiesDuJour = [];
            let promises = [];
            partiesDuJour.forEach(function(partie) {
                serializablePartiesDuJour.push(new ModeleSerializable.SerializablePartie(partie.id_partie, partie.terrain, partie.tournoi, partie.datetime_debut_partie, partie.datetime_fin_partie, partie.etat_partie, partie.temps_partie, partie.id_joueur_1, partie.id_joueur_2));
                promises.push(serializablePartiesDuJour[serializablePartiesDuJour.length-1].initPartieSerializable());
            });
            // On attend que toutes les parties aient été initialisées avant d'envoyer la liste des parties du jour
            Promise.allSettled(promises)
                .then(() => {
                    console.log('Envoi de la liste des parties du jour...');
                    return res.status(200).send(serializablePartiesDuJour).end();
                }).catch((errMsg) => {
                    console.log(new Erreur(errMsg));
                    return res.status(400).send(new Erreur(errMsg)).end();
                });
        }).catch((errMsg) => {
            console.log(new Erreur(errMsg));
            return res.status(400).send(new Erreur(errMsg)).end();
        });
});

// GET informations d'une partie
router.get('/:id_partie', function (req, res) {
    database.idPartieExisteTIl(req.params['id_partie'])
        .then((nbPartiesAvecId) => {
            if (nbPartiesAvecId !== 1) {
                console.log(new Erreur('La partie d\'id ' + req.params['id_partie'] + ' n\'existe pas.'));
                return res.status(400).send(new Erreur('La partie d\'id ' + req.params['id_partie'] + ' n\'existe pas.')).end();
            } else {
                database.recupererPartieViaId(req.params['id_partie'])
                    .then((rowPartie) => {
                        database.trouverJoueurViaIdJoueur(rowPartie.id_joueur_1)
                            .then((joueur_1) => {
                                if (joueur_1 !== undefined) {
                                    database.trouverJoueurViaIdJoueur(rowPartie.id_joueur_2)
                                        .then((joueur_2) => {
                                            if (joueur_2 !== undefined) {
                                                console.log('Envoi des informations détaillées d\'une partie...');
                                                return res.status(200).send(new Partie(rowPartie.id_partie, joueur_1, joueur_2, rowPartie.terrain, rowPartie.tournoi, rowPartie.datetime_debut_partie, rowPartie.datetime_fin_partie, rowPartie.etat_partie, rowPartie.score_manche_joueur_1, rowPartie.score_manche_joueur_2, rowPartie.tick_debut)).end();
                                            } else {
                                                console.log(new Erreur('Unable to get infos of Partie : No joueur with id' + rowPartie.id_joueur_2 + 'were found in database'));
                                                return res.status(400).send(new Erreur('Unable to get infos of Partie : No joueur with id' + rowPartie.id_joueur_2 + 'were found in database')).end(); // Bad request status code
                                            }
                                        }).catch((errMsg) => {
                                            console.log(new Erreur(errMsg));
                                            return res.status(400).send(new Erreur(errMsg)).end();
                                        });
                                } else {
                                    console.log(new Erreur('Unable to get infos of Partie : No joueur with id' + rowPartie.id_joueur_1 + 'were found in database'));
                                    return res.status(400).send(new Erreur('Unable to get infos of Partie : No joueur with id' + rowPartie.id_joueur_1 + 'were found in database')).end(); // Bad request status code
                                }
                            }).catch((errMsg) => {
                                console.log(new Erreur(errMsg));
                                return res.status(400).send(new Erreur(errMsg)).end();
                            });
                    }).catch((errMsg) => {
                        console.log(new Erreur(errMsg));
                        return res.status(400).send(new Erreur(errMsg)).end();
                    });
            }
        }).catch((errMsg) => {
            console.log(new Erreur(errMsg));
            return res.status(400).send(new Erreur(errMsg)).end();
        });
});

//GET Évènements d’un match (points et contestations)
router.get('/:id_partie/evenements', (req, res) =>{
    // TODO
});

//POST creer une partie
router.post('/', (req, res) =>{
    const body = req.body;

    if (body.id_joueur_1===undefined || body.id_joueur_2===undefined || body.datetime_debut_partie===undefined || body.tick_debut===undefined) {
        console.log(new Erreur('Contenu manquant'));
        return res.status(400).send(new Erreur('Contenu manquant')).end();
    }

    if( !dateTimeUtils.verifierChampsValide(body.datetime_debut_partie) ) {
        console.log(new Erreur('Les champs de datetime_debut_partie ne sont pas valides.'));
        return res.status(400).send(new Erreur('Les champs de datetime_debut_partie ne sont pas valides.')).end(); // Bad request status code
    }

    database.trouverJoueurViaIdJoueur(body.id_joueur_1)
        .then((joueur_1) => {
            if(joueur_1 !== undefined){
                database.trouverJoueurViaIdJoueur(body.id_joueur_2)
                    .then((joueur_2) => {
                        if(joueur_2 !== undefined){
                            let newPartie = new Partie(-1, joueur_1, joueur_2, undefined, undefined, body.datetime_debut_partie, undefined, 0, 0, 0, body.tick_debut);
                            database.creerPartie(newPartie.joueur1, newPartie.joueur2, newPartie.datetime_debut_partie, newPartie.etat_partie)
                                .then((insertedId)=> {
                                    newPartie.id_partie = insertedId;
                                    newPartie.initNewManche()
                                        .then(() => {
                                            generateur.ajouterPartie(newPartie);
                                            console.log('Création d\'une partie...');
                                            return res.status(200).end(); // OK status code
                                        }).catch((errMsg) => {
                                            console.log(new Erreur(errMsg));
                                            return res.status(400).send(new Erreur(errMsg)).end();
                                        });
                                }).catch((errMsg) => {
                                    console.log(new Erreur(errMsg));
                                    return res.status(400).send(new Erreur(errMsg)).end();
                                });
                        } else {
                            console.log(new Erreur('Unable to create Partie : No joueur with id' + body.id_joueur_2 + 'were found in database'));
                            return res.status(400).send(new Erreur('Unable to create Partie : No joueur with id' + body.id_joueur_2 + 'were found in database')).end(); // Bad request status code
                        }
                    }).catch((errMsg) => {
                        console.log(new Erreur(errMsg));
                        return res.status(400).send(new Erreur(errMsg)).end();
                    });
            } else {
                console.log(new Erreur('Unable to create Partie : No joueur with id' + body.id_joueur_1 + 'were found in database'));
                return res.status(400).send(new Erreur('Unable to create Partie : No joueur with id' + body.id_joueur_1 + 'were found in database')).end(); // Bad request status code
            }
    }).catch((errMsg) => {
        console.log(new Erreur(errMsg));
        return res.status(400).send(new Erreur(errMsg)).end();
    });
});

//GET Les horaires de la parties.
router.get('/:id_partie/horaires', (req, res) =>{
    // TODO TP3
});

//GET Les résultats de la partie.
router.get(':id_partie/resultats', (req, res) =>{
    // TODO TP3
});

module.exports = router;
