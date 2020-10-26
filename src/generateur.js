/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const Partie = require('./modeles/partie');
const Joueur = require('./modeles/joueur');

const database = require('./database');

const modificateurVitesse = Math.max(process.argv[2], 1);

const listePartie = [];

exports.ajouterPartie = function ajouterPartie(partie)
{
  listePartie.push(partie);
}

//listePartie.push(new Partie('1', new Joueur('1', 'Albert', 'Ramos', 28, 56, 'Espagne'), new Joueur('2', 'Milos', 'Raonic', 28, 16, 'Canada'), '1', 'Hale', '12h30', 0));
//listePartie.push(new Partie('2', new Joueur('3', 'Andy', 'Murray', 28, 132, 'Angleterre'), new Joueur('4', 'Andy', 'Roddick', 36, 1000, 'États-Unis'), '2', 'Hale', '13h00', 30));

const demarrer = function () {
  let tick = 0;
  setInterval(function () {
    for (const partie in listePartie) {
      if (listePartie[partie].tick_debut === tick) {
        console.log('La partie d\'id', listePartie[partie].id_partie, 'commence');
        demarrerPartie(listePartie[partie]);
      }
    }

    tick += 1;
  }, Math.floor(1000 / modificateurVitesse));
};

function demarrerPartie (partie) {
  database.updateEtatPartie(partie.id_partie, 1, function(linesChanged){
    if(linesChanged <= 0) {
      return console.log('Critical Error : Unable to update etat_partie of partie ', partie.id_partie);
    }
  });

  const timer = setInterval(function () {
    partie.jouerTour();
    if (partie.estTerminee()) {
      database.updateEtatPartie(partie.id_partie, 2, function(linesChanged){
        if(linesChanged <= 0) {
          return console.log('Critical Error : Unable to update etat_partie of partie ', partie.id_partie);
        }
      });
      clearInterval(timer);
    }
  }, Math.floor(1000 / modificateurVitesse));
}

module.exports = {};
module.exports.demarrer = demarrer;
module.exports.liste_partie = listePartie;
