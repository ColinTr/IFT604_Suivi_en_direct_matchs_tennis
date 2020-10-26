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
  const body = req.body;

  if (body.id_joueur_1===undefined || body.id_joueur_2===undefined || body.datetime_debut_partie===undefined || body.tick_debut===undefined) {
    res.status(400).json({
      erreur: 'Contenu manquant'
    }).end();
  }

  database.trouverJoueurViaIdJoueur(body.id_joueur_1, function(joueur_1) {
    if(joueur_1 !== undefined){
      database.trouverJoueurViaIdJoueur(body.id_joueur_2, function(joueur_2){
        if(joueur_2 !== undefined){
          database.creerPartie(joueur_1, joueur_2, body.datetime_debut_partie, undefined, 0, body.tick_debut, function(partie){
            gen.ajouterPartie(partie);
            res.status(200).end(); // OK status code
          });
        } else {
          console.log('Unable to create Partie : No user with id', body.id_joueur_2, 'were found in database');
          res.status(400).end(); // Bad request status code
        }
      });
    } else {
      console.log('Unable to create Partie : No user with id', body.id_joueur_1, 'were found in database');
      res.status(400).end(); // Bad request status code
    }
  });
});

module.exports = router;
