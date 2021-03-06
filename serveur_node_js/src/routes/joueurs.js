/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();
const Erreur = require('../utils/erreur');

const database = require('../utils/database');

// GET La liste de tous les joueurs enregistrés.
router.get('/', (req, res) =>{
    database.recupererTousLesJoueurs()
        .then(joueurs => {
            console.log('Envoi de la liste de tous les joueurs...');
            return res.status(200).send(joueurs).end()
        }).catch(errMsg =>{
            console.log(new Erreur(errMsg));
            return res.status(400).send(new Erreur(errMsg)).end()
        })
});

module.exports = router;