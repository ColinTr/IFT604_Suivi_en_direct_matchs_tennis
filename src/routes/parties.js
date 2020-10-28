/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const generateur = require('../generateur');
const database = require('../database');
const Partie = require('../modeles/partie');

/* GET parties listing. */
router.get('/', function (req, res, next) {
    // TODO
    res.send(generateur.liste_partie);
});

router.get('/:id', function (req, res, next) {
    // TODO
    res.send(generateur.liste_partie[req.params.id]);
});

//GET Les horaires de la parties.
router.get('/:id_partie/horaires', (req, res) =>{
    // TODO
});

//GET Les résultats de la partie.
router.get(':id_partie/resultats', (req, res) =>{
    // TODO
});

//GET Informations sur une partie
router.get('/:id_partie', (req, res) =>{
    // TODO
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

    database.trouverJoueurViaIdJoueur(body.id_joueur_1)
        .then((joueur_1) => {
            if(joueur_1 !== undefined){
                database.trouverJoueurViaIdJoueur(body.id_joueur_2)
                    .then((joueur_2) => {
                        if(joueur_2 !== undefined){
                            let newPartie = new Partie(-1, joueur_1, joueur_2, undefined, undefined, body.datetime_debut_partie, undefined, 0, 0, 0, body.tick_debut);
                            database.creerPartie(newPartie.joueur1, newPartie.joueur2, newPartie.datetime_debut_partie, newPartie.datetime_fin_partie, newPartie.etat_partie)
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
                            console.log('Unable to create Partie : No user with id', body.id_joueur_2, 'were found in database');
                            return res.status(400).end(); // Bad request status code
                        }
                    }).catch((errMsg) => {
                        return console.log(errMsg);
                    });
            } else {
                console.log('Unable to create Partie : No user with id', body.id_joueur_1, 'were found in database');
                return res.status(400).end(); // Bad request status code
            }
    }).catch((errMsg) => {
        return console.log(errMsg);
    });
});

module.exports = router;
