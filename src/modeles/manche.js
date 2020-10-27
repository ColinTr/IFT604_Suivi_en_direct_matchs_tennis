/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../database');
const Jeu = require('./jeu');

class Manche {
    constructor(parent, id_manche, id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche) {
        let that = this;
        this.parent = parent;
        this.id_manche = id_manche;
        this.id_partie = id_partie;
        this.score_jeux_joueur_1 = score_jeux_joueur_1;
        this.score_jeux_joueur_2 = score_jeux_joueur_2;
        this.nb_contestations_joueur_1 = nb_contestations_joueur_1;
        this.nb_contestations_joueur_2 = nb_contestations_joueur_2;
        this.etat_manche = etat_manche;

        this.jeu = new Jeu(this,-1, this.id_manche, -1, 1, 0, 0, 0);
        database.creerJeu(this.jeu.id_manche, -1, this.jeu.joueur_au_service, this.jeu.score_echanges_joueur_1, this.jeu.score_echanges_joueur_2, this.jeu.etat_Jeu, function(insertedId){
            that.jeu.id_jeu = insertedId;
        });
    }

    updateManche(){
        let that = this;

        this.jeu.updateJeu();

        // Si le jeu en cours est terminé, on met à jour les scores
        if(this.jeu.etat_Jeu === 1) {
            if(this.jeu.score_echanges_joueur_1 > this.jeu.score_echanges_joueur_2) {
                this.score_jeux_joueur_1 += 1;
                database.updateScoreJeuxJoueur1Manche(this.id_manche, this.score_jeux_joueur_1, function(linesChanged){
                    if(linesChanged <= 0) {
                        return console.log('Critical Error : Unable to update score_jeux_joueur_1 of manche ', that.id_manche);
                    }
                });
            } else {
                this.score_jeux_joueur_2 += 1;
                database.updateScoreJeuxJoueur2Manche(this.id_manche, this.score_jeux_joueur_2, function(linesChanged){
                    if(linesChanged <= 0) {
                        return console.log('Critical Error : Unable to update score_jeux_joueur_2 of manche ', that.id_manche);
                    }
                });
            }

            // Si l'un des deux joueurs a remporté 6 jeux, la manche est terminée
            if(this.score_jeux_joueur_1 >= 6 || this.score_jeux_joueur_2 >= 6) {
                // On passe l'état de la manche à 1 (= "terminée")
                this.etat_manche = 1;
                database.updateEtatManche(this.id_manche, 1, function(linesChanged){
                    if(linesChanged <= 0) {
                        return console.log('Critical Error : Unable to update etat_manche of manche ', that.id_manche);
                    }
                });
            }

            // Si le jeu est terminé et que la partie est toujours en cours, on commence un nouveau jeu
            if(this.jeu.etat_Jeu === 1 && this.etat_manche !== 1) {
                let joueur_au_service_du_nouveau_jeu = (this.jeu.joueur_au_service + 1) % 2;
                this.jeu = new Jeu(this,-1, this.id_manche, 1, joueur_au_service_du_nouveau_jeu, 0, 0);
                database.creerJeu(this.jeu.id_manche, -1, this.jeu.joueur_au_service, this.jeu.score_echanges_joueur_1, this.jeu.score_echanges_joueur_2, this.jeu.etat_Jeu, function(insertedId){
                    that.jeu.id_jeu = insertedId;
                });
            }
        }
    }

    toJSON () {
        return {
            'id_manche': this.id_manche,
            'id_partie': this.id_partie,
            'score_jeux_joueur_1': this.score_jeux_joueur_1,
            'score_jeux_joueur_2': this.score_jeux_joueur_2,
            'nb_contestations_joueur_1': this.nb_contestations_joueur_1,
            'nb_contestations_joueur_2': this.nb_contestations_joueur_2,
            'etat_manche': this.etat_manche
        };
    }
}

module.exports = Manche;