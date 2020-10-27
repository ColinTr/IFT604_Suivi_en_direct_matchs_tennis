/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../database');
const Manche = require('./manche');

class Partie {
  constructor(id_partie, joueur1, joueur2, terrain, tournoi, datetime_debut_partie, datetime_fin_partie, etat_partie, score_manche_joueur_1, score_manche_joueur_2, tickDebut) {
    let that = this;
    this.id_partie = id_partie;
    this.joueur1 = joueur1;
    this.joueur2 = joueur2;
    this.terrain = terrain;
    this.tournoi = tournoi;
    this.datetime_debut_partie = datetime_debut_partie;
    this.datetime_fin_partie = datetime_fin_partie;
    this.etat_partie = etat_partie;
    this.score_manche_joueur_1 = score_manche_joueur_1;
    this.score_manche_joueur_2 = score_manche_joueur_2;
    this.temps_partie = 0;
    this.tick_debut = tickDebut;

    this.manche = new Manche(this,-1, this.id_partie, 0, 0, 3, 3,0);
    database.creerManche(this.manche.id_partie, this.manche.score_jeux_joueur_1, this.manche.score_jeux_joueur_2, this.manche.nb_contestations_joueur_1, this.manche.nb_contestations_joueur_2, this.manche.etat_manche, function(insertedId){
      that.manche.id_manche = insertedId;
    });

    this.modificateurVitesse = Math.max(process.argv[2], 1);
  }

  jouerPartie() {
    let that = this;

    // La partie commence, donc on passe son état à 1 (= "en cours")
    database.updateEtatPartie(this.id_partie, 1, function(linesChanged){
      if(linesChanged <= 0) {
        return console.log('Critical Error : Unable to update etat_partie of partie ', that.id_partie);
      }
    });

    const timer = setInterval(function () {
      that.manche.updateManche();

      // Si la manche en cours est terminée, on met à jour les scores
      if(that.manche.etat_manche === 1) {
        if(that.manche.score_jeux_joueur_1 > that.manche.score_jeux_joueur_2) {
          that.score_manche_joueur_1 += 1;
          database.updateScoreMancheJoueur1Partie(that.id_partie, that.score_manche_joueur_1, function(linesChanged){
            if(linesChanged <= 0) {
              return console.log('Critical Error : Unable to update score_manche_joueur_1 of partie ', that.id_partie);
            }
          });
        } else {
          this.score_manche_joueur_2 += 1;
          database.updateScoreMancheJoueur2Partie(that.id_partie, that.score_manche_joueur_2, function(linesChanged){
            if(linesChanged <= 0) {
              return console.log('Critical Error : Unable to update score_manche_joueur_2 of partie ', that.id_partie);
            }
          });
        }

        // Si l'un des deux joueurs a remporté 2 manches, la partie est terminée
        if(that.score_manche_joueur_1 >= 2 || that.score_manche_joueur_2 >= 2) {
          // On passe l'état de la partie à 2 (= "terminée")
          that.etat_partie = 1;
          database.updateEtatPartie(that.id_partie, 2, function(linesChanged){
            if(linesChanged <= 0) {
              return console.log('Critical Error : Unable to update etat_partie of partie ', that.id_partie);
            }
          });
          clearInterval(timer);
        }

        //Si la manche est terminée et que la partie est toujours en cours, on commence une nouvelle manche
        if(that.manche.etat_manche === 1 && that.etat_partie !== 1) {
          that.manche = new Manche(that,-1, that.id_partie, 0, 0, 3, 3, 0);
          database.creerManche(that.manche.id_partie, that.manche.score_jeux_joueur_1, that.manche.score_jeux_joueur_2, that.manche.nb_contestations_joueur_1, that.manche.nb_contestations_joueur_2, that.manche.etat_manche, function(insertedId){
            that.manche.id_manche = insertedId;
          });
        }
      }

      that.temps_partie += Math.floor(Math.random() * 60); // entre 0 et 60 secondes entre chaque point
    }, Math.floor(1000 / this.modificateurVitesse));
  }

  toJSON () {
    return {
      'joueur1': this.joueur1,
      'joueur2': this.joueur2,
      'terrain': this.terrain,
      'tournoi': this.tournoi,
      'datetime_debut_partie': this.datetime_debut_partie,
      'datetime_fin_partie': this.datetime_fin_partie,
      'etat_partie': this.etat_partie,
      'score_manche_joueur_1': this.score_manche_joueur_1,
      'score_manche_joueur_2': this.score_manche_joueur_2,
      'temps_partie': this.temps_partie
    };
  }
}

module.exports = Partie;