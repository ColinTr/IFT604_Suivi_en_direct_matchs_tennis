/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../utils/database');
const Jeu = require('./jeu');

class Manche {
    constructor(parent, id_manche, id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche) {
        this.parent = parent;
        this.id_manche = id_manche;
        this.id_partie = id_partie;
        this.score_jeux_joueur_1 = score_jeux_joueur_1;
        this.score_jeux_joueur_2 = score_jeux_joueur_2;
        this.nb_contestations_joueur_1 = nb_contestations_joueur_1;
        this.nb_contestations_joueur_2 = nb_contestations_joueur_2;
        this.etat_manche = etat_manche;

        this.jeu = undefined;
    }

    initNewJeu(joueurAuService) {
        return new Promise((resolve, reject) => {
            let that = this;
            let newJeu = new Jeu(this,-1, this.id_manche, -1, joueurAuService, 0, 0, 0);
            database.creerJeu(newJeu.id_manche, newJeu.gagne_par_joueur, newJeu.joueur_au_service, newJeu.score_echanges_joueur_1, newJeu.score_echanges_joueur_2, newJeu.etat_Jeu)
                .then((insertedId) => {
                    newJeu.id_jeu = insertedId;
                    newJeu.initNewEchange().then(() => {
                        that.jeu = newJeu;
                        resolve();
                    })
                    .catch((msg) => {
                        return console.log(msg);
                    });
                })
                .catch((msg) => {
                    return console.log(msg);
                });
        });
    }

    updateManche(){
        let that = this;

        if(this.jeu !== undefined) {

            this.jeu.updateJeu();

            // Si le jeu en cours est terminé, on met à jour les scores
            if(this.jeu.etat_Jeu === 1) {
                if(this.jeu.gagne_par_joueur === 1) {
                    this.score_jeux_joueur_1 = this.score_jeux_joueur_1 + 1;
                } else {
                    this.score_jeux_joueur_2 = this.score_jeux_joueur_2 + 1;
                }

                // Si l'un des deux joueurs a remporté 6 jeux, la manche est terminée
                if(this.score_jeux_joueur_1 >= 6 || this.score_jeux_joueur_2 >= 6) {
                    // On passe l'état de la manche à 1 (= "terminée")
                    this.etat_manche = 1;
                }

                database.updateManche(this.id_manche, this.score_jeux_joueur_1, this.score_jeux_joueur_2, this.nb_contestations_joueur_1, this.nb_contestations_joueur_2, this.etat_manche)
                    .then((nbRowsAffected) => {
                        if (nbRowsAffected <= 0) {
                            return console.log('Critical Error : Unable to update all infos of manche', that.id_manche);
                        }
                    }).catch((errMsg) => {
                        return console.log(errMsg);
                    });

                // Si le jeu est terminé et que la partie est toujours en cours, on commence un nouveau jeu
                if(this.jeu.etat_Jeu === 1 && this.etat_manche !== 1) {
                    let joueur_au_service_du_nouveau_jeu = this.jeu.joueur_au_service % 2 + 1;
                    this.initNewJeu(joueur_au_service_du_nouveau_jeu);
                }
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