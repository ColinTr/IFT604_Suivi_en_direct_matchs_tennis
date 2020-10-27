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
        res.status(400).json({
            erreur: 'Contenu manquant'
        }).end();
        return;
    }
    if (body.montant_pari <= 0) {
        res.status(400).json({
            erreur: 'Impossible de parier un chiffre inférieur ou égal à 0'
        }).end();
        return;
    }
    // On vérifie que le joueur existe


    // On vérifie que l'utilisateur existe


    // On vérifie que la partie existe
    database.nombreDeManchesDeLaPartieTerminees(body.id_partie)
        .then((nbManchesTerminees)=> {
            if(nbManchesTerminees >= 1) {
                res.send('{ \"erreur\" : \"la première manche est terminée, impossible de parier.\"}');
            } else {
            }
        })
        .catch((err)=> {
            res.send('error = ' + err);
        });

    // Le montant gagné est égal à 75% du montant total parié réparti au prorata de leur mise entre les gagnants. Le système conserve donc 25% des sommes pariées.
    // TODO

    // Méthode push pour informer que le pari a été enregistré par le système
    // TODO

    // Méthode push pour informer des gains
    // TODO
});

//GET Affichage du gain réalisé par l’utilisateur à la fin de la partie
router.get('/utilisateur/:id_utilisateur/partie/:id_partie', (req, res) =>{
    // TODO
});

module.exports = router;
