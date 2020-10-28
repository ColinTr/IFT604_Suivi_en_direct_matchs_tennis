/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const gen = require('../generateur');
const database = require("../database");

//POST Créer un nouveau pari
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
                return res.status(400).send('{ \"erreur\" : \"Aucun utilisateur avec l\'id renseigné pour le pari n\'existe.\"}');
            }
        });
    // On vérifie que l'utilisateur existe
    database.trouverJoueurViaIdJoueur(body.id_joueur)
        .then((joueur) => {
           if(joueur === undefined){
               return res.status(400).send('{ \"erreur\" : \"Aucun joueur avec l\'id renseigné pour le pari n\'existe.\"}');
           }
        }).catch((errMsg) => {
            return console.log(errMsg);
        });
    // On vérifie si la partie existe
    // TODO

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

    // Le montant gagné est égal à 75% du montant total parié réparti au prorata de leur mise entre les gagnants. Le système conserve donc 25% des sommes pariées.
    // TODO

    // Méthode push pour informer des gains
    // TODO
});

//GET Affichage du gain réalisé par l’utilisateur à la fin de la partie
router.get('/utilisateur/:id_utilisateur/partie/:id_partie', (req, res) =>{
    // TODO
});

module.exports = router;
