/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const gen = require('../generateur');

/* GET parties listing. */
router.get('/', function (req, res, next) {
  res.send(gen.liste_partie);
});

router.get('/:id', function (req, res, next) {
  res.send(gen.liste_partie[req.params.id]);
});

//GET Les horaires de la parties.
router.get('/:id_partie/horaires', (req, res) =>{
  // TODO
});

//GET Les résultats de la partie.
router.get(':id_partie/resultats', (req, res) =>{
  // TODO
});

//GET Informations sur une partie
router.get('/:id_partie', (req, res) =>{

});

//GET Évènements d’un match (points et contestations)
router.get('/:id_partie/evenements', (req, res) =>{

});

module.exports = router;
