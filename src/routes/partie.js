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

module.exports = router;
