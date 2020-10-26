/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const gen = require('../generateur');

//POST Créer un nouveau pari
router.post('/', (req, res) =>{
    // TODO
});

//GET Affichage du gain réalisé par l’utilisateur à la fin de la partie
router.get('/utilisateur/:id_utilisateur/partie/:id_partie', (req, res) =>{
    // TODO
});

module.exports = router;
