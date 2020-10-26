/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const Partie = require('../modeles/partie.js');
const Joueur = require('../modeles/joueur.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  const p = new Partie(new Joueur('Albert', 'Ramos', 28, 56, 'Espagne'), new Joueur('Milos', 'Raonic', 28, 16, 'Canada'), '1', 'hale', '12h30');
  // res.send('Bienvenu dans le serveur du service Échanges.');
  res.send(p);
});

//Liste des parties du jour (en cours, à venir et terminées)
router.get('/parties', (req, res) =>{

});

//Informations sur une partie
router.get('/parties/:id_partie', (req, res) =>{

});

//Évènements d’un match (points et contestations)
router.get('/parties/:id_partie/evenements', (req, res) =>{

});

//Créer un nouveau pari
router.post('/paris', (req, res) =>{

});

//Affichage du gain réalisé par l’utilisateur à la fin de la partie
router.get('/paris/utilisateur/:id_utilisateur/partie/:id_partie', (req, res) =>{

});

//Le serveur renvoie l’id_utilisateur correspondant.
router.get('/utilisateur/:nom_utilisateur', (req, res) =>{

});

//La liste de tous les joueurs enregistrés.
router.get('/joueurs', (req, res) =>{

});

//Les horaires de la parties.
router.get('/parties/:id_partie/horaires', (req, res) =>{

});

//Les résultats de la partie.
router.get('parties/:id_partie/resultats', (req, res) =>{

});

module.exports = router;
