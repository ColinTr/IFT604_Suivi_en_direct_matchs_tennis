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

// GET la liste des parties du jour
router.get('/', function (req, res) {
    database.recupererToutesLesPartiesDuJour()
        .then(partiesDuJour => {
            console.log("Partie du jour ",partiesDuJour)
            res.send(partiesDuJour);
        })
        .catch(err => {
            console.log(err)
        })

});

// GET informations d'une partie
router.get('/:id_partie', function (req, res, next) {
    database.idPartieExisteTIl(req.params['id_partie'])
        .then((nbPartiesAvecId) => {
            if (nbPartiesAvecId !== 1) {
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
                                                return res.status(200).send(new Partie(rowPartie.id_partie, joueur_1, joueur_2, rowPartie.terrain, rowPartie.tournoi, rowPartie.datetime_debut_partie, rowPartie.datetime_fin_partie, rowPartie.etat_partie, rowPartie.score_manche_joueur_1, rowPartie.score_manche_joueur_2, rowPartie.tick_debut)).end();
                                            } else {
                                                return res.status(400).send(new Erreur('Unable to get infos of Partie : No joueur with id' + rowPartie.id_joueur_2 + 'were found in database')).end(); // Bad request status code
                                            }
                                        }).catch((errMsg) => {
                                        return console.log(errMsg);
                                    });
                                } else {
                                    return res.status(400).send(new Erreur('Unable to get infos of Partie : No joueur with id' + rowPartie.id_joueur_1 + 'were found in database')).end(); // Bad request status code
                                }
                            }).catch((errMsg) => {
                            return console.log(errMsg);
                        });
                    }).catch((errMsg) => {
                    return console.log(errMsg);
                });
            }
        }).catch((errMsg) => {
            return console.log(errMsg);
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
        return res.status(400).json({
            erreur: 'Contenu manquant'
        }).end();
    }

    if( !dateTimeUtils.verifierChampsValide(body.datetime_debut_partie) ) {
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
                                            return res.status(200).end(); // OK status code
                                        })
                                        .catch((msg) => {
                                            return console.log(msg);
                                        });
                                })
                                .catch((msg) => {
                                    return console.log(msg);
                                });
                        } else {
                            return res.status(400).send(new Erreur('Unable to create Partie : No joueur with id' + body.id_joueur_2 + 'were found in database')).end(); // Bad request status code
                        }
                    }).catch((errMsg) => {
                        return console.log(errMsg);
                    });
            } else {
                return res.status(400).send(new Erreur('Unable to create Partie : No joueur with id' + body.id_joueur_1 + 'were found in database')).end(); // Bad request status code
            }
    }).catch((errMsg) => {
        return console.log(errMsg);
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
