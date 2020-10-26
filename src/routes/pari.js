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
router.post('/paris', (req, res) =>{
    // TODO
});

//GET Affichage du gain réalisé par l’utilisateur à la fin de la partie
router.get('/paris/utilisateur/:id_utilisateur/partie/:id_partie', (req, res) =>{

});

module.exports = router;
