/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const database = require("../database");

// POST Créer un nouveau pari
router.post('/', (req, res) =>{
    // On vérifie s'il manque des informations
    const body = req.body;
    if (body.id_utilisateur===undefined || body.id_partie===undefined || body.id_joueur===undefined || body.montant_pari===undefined) {
        return res.status(400).send('{ \"erreur\" : \"Contenu manquant.\"}');
    }
    if (body.montant_pari <= 0) {
        return res.status(400).send('{ \"erreur\" : \"Impossible de parier un chiffre inférieur ou égal à 0.\"}');
    }

    // On vérifie que l'utilisateur existe
    database.idUtilisateurExisteTIl(body.id_utilisateur)
        .then((nbUtilisateur) => {
            if(nbUtilisateur <= 0) {
                return res.status(400).send('{ \"erreur\" : \"L\'utilisateur d\'id ' + body.id_utilisateur + ' n\'existe pas.\"}');
            } else {
                // On vérifie que l'utilisateur existe
                database.trouverJoueurViaIdJoueur(body.id_joueur)
                    .then((joueur) => {
                        if(joueur === undefined){
                            return res.status(400).send('{ \"erreur\" : \"Le joueur d\'id ' + body.id_joueur + ' n\'existe pas.\"}');
                        } else {
                            // On vérifie si la partie existe
                            database.idPartieExisteTIl(body.id_partie)
                                .then((nbPartiesAvecId) => {
                                    if(nbPartiesAvecId !== 1) {
                                        return res.status(400).send('{ \"erreur\" : \"La partie d\'id ' + body.id_partie + ' n\'existe pas.\"}');
                                    } else {
                                        // On vérifie que la partie que la partie n'a pas de manche terminée
                                        database.nombreDeManchesDeLaPartieTerminees(body.id_partie)
                                            .then((nbManchesTerminees) => {
                                                if(nbManchesTerminees >= 1) {
                                                    return res.status(400).send('{ \"erreur\" : \"la première manche est terminée, impossible de parier.\"}');
                                                } else {
                                                    database.creerPari(body.montant_pari, 0, body.id_partie, body.id_utilisateur, body.id_joueur)
                                                        .then(idPari => {
                                                            return res.status(200).send('id pari cree en bdd : ' + idPari);
                                                            // TODO : Méthode push pour informer que le pari a été enregistré par le système
                                                        }).catch((err) => {
                                                            return res.status(400).send('error : ' + err);
                                                        });
                                                }
                                            }).catch((err) => {
                                                return res.status(400).send('error : ' + err);
                                            });
                                    }
                                }).catch((errMsg) => {
                                    return console.log(errMsg);
                                });
                        }
                    }).catch((errMsg) => {
                        return console.log(errMsg);
                    });
            }
        });

    // La méthode push pour informer des gains se trouve dans modele/partie.js
});

// GET Affichage du gain réalisé par l’utilisateur à la fin de la partie
// => Puisqu'il est possible qu'un joueur parie plusieurs fois sur la même partie,
//        On renvoie un tableau avec tous les paris du joueur sur la partie
// => On permet de récupérer la liste de tous les paris d'une partie même si elle n'est pas terminée
//        Les attributs montant_gagne seront donc "null"
router.get('/utilisateur/:id_utilisateur/partie/:id_partie', (req, res) =>{
    if(req.params['id_utilisateur'] === undefined || req.params['id_partie'] === undefined) {
        return res.status(400).send('{ \"erreur\" : \"Paramètres de requête manquant\"}');
    } else {
        database.idUtilisateurExisteTIl(req.params['id_utilisateur'])
            .then((nbUtilisateur) => {
                if(nbUtilisateur <= 0) {
                    return res.status(400).send('{ \"erreur\" : \"L\'utilisateur d\'id ' + req.params['id_utilisateur'] + ' n\'existe pas.\"}');
                } else {
                    database.idPartieExisteTIl(req.params['id_partie'])
                        .then((nbPartiesAvecId) => {
                            if(nbPartiesAvecId !== 1) {
                                return res.status(400).send('{ \"erreur\" : \"La partie d\'id ' + req.params['id_partie'] + ' n\'existe pas.\"}');
                            } else {
                                database.listeParisDuJoueurPourPartie(req.params['id_partie'], req.params['id_utilisateur'])
                                    .then((paris) => {
                                        return res.status(200).send(paris).end()
                                    }).catch((errMsg) => {
                                        return console.log(errMsg);
                                    });
                            }
                        }).catch((errMsg) => {
                            return console.log(errMsg);
                        });
                }
            }).catch((errMsg) => {
                return console.log(errMsg);
            });
    }
});

module.exports = router;