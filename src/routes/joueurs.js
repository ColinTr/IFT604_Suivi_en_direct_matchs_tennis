/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();
const erreur = require('../erreur');

const generateur = require('../generateur');
const database = require('../database');

//GET La liste de tous les joueurs enregistrés.
router.get('/', (req, res) =>{
    database.recupererTousLesJoueurs()
        .then(joueurs => {
            res.status(200).send(joueurs).end()
        })
        .catch(errMsg =>{
            var erreur = new Erreur(errMsg)
            res.status(400).send(erreur.toJSON()).end()
        })

});

module.exports = router;