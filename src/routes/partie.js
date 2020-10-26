/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const gen = require('../generateur');
const database = require('../database');

/* GET parties listing. */
router.get('/', function (req, res, next) {
  // TODO
  res.send(gen.liste_partie);
});

router.get('/:id', function (req, res, next) {
  // TODO
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
  // TODO
});

//GET Évènements d’un match (points et contestations)
router.get('/:id_partie/evenements', (req, res) =>{
  // TODO
});

//POST creer une partie
router.post('/', (req, res) =>{
  const body = req.body

  if (!body.id_joueur_1 || !body.id_joueur_2 || !body.datetime_debut_partie || !body.tick_debut ) {
    return response.status(400).json({
      erreur: 'Contenu manquant'
    })
  }

  const joueur_1 = database.trouverJoueurViaIdJoueur(body.id_joueur_1)
  const joueur_2 = database.trouverJoueurViaIdJoueur(body.id_joueur_2)



  gen.ajouterPartie()

});

module.exports = router;
