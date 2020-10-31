/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const database = require("../utils/database");
const Erreur = require("../utils/erreur");
const ModeleSerializable = require('../modeles/SerializableClasses');

// POST Créer un nouveau pari
router.post('/', (req, res) =>{
    // On vérifie s'il manque des informations
    const body = req.body;
    if (body.id_utilisateur===undefined || body.id_partie===undefined || body.id_joueur===undefined || body.montant_pari===undefined) {
        console.log(new Erreur('Contenu manquant.'));
        return res.status(400).send(new Erreur('Contenu manquant.'));
    }
    if (body.montant_pari <= 0) {
        console.log(new Erreur('Impossible de parier un chiffre inférieur ou égal à 0.'));
        return res.status(400).send(new Erreur('Impossible de parier un chiffre inférieur ou égal à 0.'));
    }

    // On vérifie que l'utilisateur existe
    database.idUtilisateurExisteTIl(body.id_utilisateur)
        .then((nbUtilisateur) => {
            if(nbUtilisateur <= 0) {
                console.log(new Erreur('L\'utilisateur d\'id ' + body.id_utilisateur + ' n\'existe pas.'));
                return res.status(400).send(new Erreur('L\'utilisateur d\'id ' + body.id_utilisateur + ' n\'existe pas.'));
            } else {
                // On vérifie que le joueur existe
                database.trouverJoueurViaIdJoueur(body.id_joueur)
                    .then((joueur) => {
                        if(joueur === undefined){
                            console.log(new Erreur('Le joueur d\'id ' + body.id_joueur + ' n\'existe pas.'));
                            return res.status(400).send(new Erreur('Le joueur d\'id ' + body.id_joueur + ' n\'existe pas.'));
                        } else {
                            // On vérifie si la partie existe
                            database.idPartieExisteTIl(body.id_partie)
                                .then((nbPartiesAvecId) => {
                                    if(nbPartiesAvecId !== 1) {
                                        console.log(new Erreur('La partie d\'id ' + body.id_partie + ' n\'existe pas.'));
                                        return res.status(400).send(new Erreur('La partie d\'id ' + body.id_partie + ' n\'existe pas.'));
                                    } else {
                                        // On vérifie que la partie que la partie n'a pas de manche terminée
                                        database.nombreDeManchesDeLaPartieTerminees(body.id_partie)
                                            .then((nbManchesTerminees) => {
                                                if(nbManchesTerminees >= 1) {
                                                    console.log(new Erreur('La partie d\'id ' + body.id_partie + ' n\'existe pas.'));
                                                    return res.status(400).send(new Erreur('la première manche est terminée, impossible de parier.'));
                                                } else {
                                                    database.creerPari(body.montant_pari, 0, body.id_partie, body.id_utilisateur, body.id_joueur)
                                                        .then(idPari => {
                                                            console.log('Création d\'un nouveau pari...');
                                                            return res.status(200).send('id pari cree en bdd : ' + idPari);
                                                            // TODO : Méthode push pour informer que le pari a été enregistré par le système
                                                        }).catch((errMsg) => {
                                                            console.log(new Erreur(errMsg));
                                                            return res.status(400).send(new Erreur(errMsg)).end();
                                                        });
                                                }
                                            }).catch((errMsg) => {
                                                console.log(new Erreur(errMsg));
                                                return res.status(400).send(new Erreur(errMsg)).end();
                                            });
                                    }
                                }).catch((errMsg) => {
                                    console.log(new Erreur(errMsg));
                                    return res.status(400).send(new Erreur(errMsg)).end();
                                });
                        }
                    }).catch((errMsg) => {
                        console.log(new Erreur(errMsg));
                        return res.status(400).send(new Erreur(errMsg)).end();
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
                    console.log(new Erreur('L\'utilisateur d\'id ' + req.params['id_utilisateur'] + ' n\'existe pas.'));
                    return res.status(400).send(new Erreur('L\'utilisateur d\'id ' + req.params['id_utilisateur'] + ' n\'existe pas.'));
                } else {
                    database.idPartieExisteTIl(req.params['id_partie'])
                        .then((nbPartiesAvecId) => {
                            if(nbPartiesAvecId !== 1) {
                                console.log(new Erreur('La partie d\'id ' + req.params['id_partie'] + ' n\'existe pas.'));
                                return res.status(400).send(new Erreur('La partie d\'id ' + req.params['id_partie'] + ' n\'existe pas.'));
                            } else {
                                database.listeParisDuJoueurPourPartie(req.params['id_partie'], req.params['id_utilisateur'])
                                    .then((paris) => {
                                        console.log('Envoi des paris d\'un utilisateur pour la partie d\'id ' + req.params['id_partie']);
                                        return res.status(200).send(paris).end()
                                    }).catch((errMsg) => {
                                        console.log(new Erreur(errMsg));
                                        return res.status(400).send(new Erreur(errMsg)).end();
                                    });
                            }
                        }).catch((errMsg) => {
                            console.log(new Erreur(errMsg));
                            return res.status(400).send(new Erreur(errMsg)).end();
                        });
                }
            }).catch((errMsg) => {
                console.log(new Erreur(errMsg));
                return res.status(400).send(new Erreur(errMsg)).end();
            });
    }
});

// GET Affichage de tous les paris d'un joueur
router.get('/utilisateur/:id_utilisateur', (req, res) =>{
    if(req.params['id_utilisateur'] === undefined) {
        return res.status(400).send('{ \"erreur\" : \"Paramètres de requête manquant\"}');
    } else {
        database.idUtilisateurExisteTIl(req.params['id_utilisateur'])
            .then((nbUtilisateur) => {
                if(nbUtilisateur <= 0) {
                    console.log(new Erreur('L\'utilisateur d\'id ' + req.params['id_utilisateur'] + ' n\'existe pas.'));
                    return res.status(400).send(new Erreur('L\'utilisateur d\'id ' + req.params['id_utilisateur'] + ' n\'existe pas.'));
                } else {
                    database.listeParisDuJoueur(req.params['id_utilisateur'])
                        .then((paris) => {
                            let promises = [];
                            let liste_paris = [];
                            paris.forEach(function(pari) {
                                liste_paris.push(new ModeleSerializable.SerializablePari(pari.id_pari, pari.id_utilisateur, pari.id_joueur, pari.montant_parie, pari.id_partie, pari.montant_gagne));
                                promises.push(liste_paris[liste_paris.length-1].initPariSerializable());
                            });
                            Promise.allSettled(promises)
                                .then(()=>{
                                    console.log('Envoi de tous les paris d\'un utilisateur');
                                    return res.status(200).send(liste_paris).end()
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
    }
});

module.exports = router;