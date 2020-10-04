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
module.exports = router;
