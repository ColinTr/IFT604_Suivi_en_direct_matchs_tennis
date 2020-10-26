/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const Pointage = require('./pointage.js');

class Partie {
  constructor (id_partie, joueur1, joueur2, terrain, tournoi, datetime_debut_partie, datetime_fin_partie, etat_partie, score_manche_joueur_1, score_manche_joueur_2, tickDebut) {
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

    this.pointage = new Pointage(this);
    this.temps_partie = 0;
    this.joueur_au_service = Math.floor(Math.random() * 2);
    this.vitesse_dernier_service = 0;
    this.nombre_coup_dernier_echange = 0;
    this.constestation = [3, 3];
    this.tick_debut = tickDebut;
  }

  jouerTour () {
    let contestationReussie = false;
    if ((Math.random() * 100) < 3) { // 3% de contestation
      if (!Partie.contester()) {
        const contestant = Math.floor(Math.random() * 2);
        this.constestation[contestant] = Math.max(0, this.constestation[contestant] - 1);
        console.log('contestation echouee');
      } else {
        contestationReussie = true;
        console.log('contestation reussie');
      }
    }

    if (!contestationReussie) {
      this.pointage.ajouterPoint(Math.floor(Math.random() * 2));
    }
    this.temps_partie += Math.floor(Math.random() * 60); // entre 0 et 60 secondes entre chaque point
    this.vitesse_dernier_service = Math.floor(Math.random() * (250 - 60 + 1)) + 60; // entre 60 et 250 km/h
    this.nombre_coup_dernier_echange = Math.floor(Math.random() * (30 - 1 + 1)) + 1; // entre 1 et 30 coups par échange


  }

  static contester () {
    return (Math.random() * 100) > 25; // 75% de chance que la contestation passe
  }

  changerServeur () {
    this.joueur_au_service = (this.joueur_au_service + 1) % 2;
  }

  nouvelleManche () {
    this.constestation = [3, 3];
  }

  estTerminee () {
    return this.pointage.final;
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

      'pointage': this.pointage,
      'temps_partie': this.temps_partie,
      'serveur': this.joueur_au_service,
      'vitesse_dernier_service': this.vitesse_dernier_service,
      'nombre_coup_dernier_echange': this.nombre_coup_dernier_echange,
      'constestation': this.constestation
    };
  }
}

module.exports = Partie;