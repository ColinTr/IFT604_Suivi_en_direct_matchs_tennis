/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../utils/database');
const Echange = require('./echange');

class Jeu {
    constructor(parent, id_jeu, id_manche, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_Jeu) {
        this.parent = parent;
        this.id_jeu = id_jeu;
        this.id_manche = id_manche;
        this.gagne_par_joueur = gagne_par_joueur;
        this.joueur_au_service = joueur_au_service;
        this.score_echanges_joueur_1 = score_echanges_joueur_1;
        this.score_echanges_joueur_2 = score_echanges_joueur_2;
        this.etat_Jeu = etat_Jeu;

        this.echange = undefined;
    }

    initNewEchange() {
        return new Promise((resolve, reject) => {
            let that = this;
            let newEchange = new Echange(this, -1, this.id_jeu, -1, -1, -1, 0, 0,0);

            database.creerEchange(newEchange.id_jeu, newEchange.gagne_par_joueur, newEchange.conteste_par_joueur, newEchange.contestation_acceptee, newEchange.etat_echange, newEchange.vitesse_service, newEchange.nombre_coup_echange)
                .then((insertedId) => {
                    newEchange.id_echange = insertedId;
                    that.echange = newEchange;
                    resolve();
                })
                .catch((msg) => {
                    return console.log(msg);
                });
        });
    }

    updateJeu(){
        let that = this;

        if(this.echange !== undefined){

            this.echange.updateEchange()
                .then( () => {
                    if(that.echange.etat_echange === 1) {
                        // Si l'échange est gagné par le joueur 1
                        if(that.echange.gagne_par_joueur === 1) {
                            // Si le joueur 1 était à 40 points et qu'il gagne un échange
                            if (that.score_echanges_joueur_1 === 40) {
                                that.gagne_par_joueur = 1;
                                that.etat_Jeu = 1;
                            } else {
                                that.score_echanges_joueur_1 = incrementScoreJeu(that.score_echanges_joueur_1);
                            }
                        } else {// Si l'échange est gagné par le joueur 2
                            // Si le joueur 2 était à 40 points et qu'il gagne un échange
                            if(that.score_echanges_joueur_2 === 40){
                                that.gagne_par_joueur = 2;
                                that.etat_Jeu = 1;
                            } else {
                                that.score_echanges_joueur_2 = incrementScoreJeu(that.score_echanges_joueur_2);
                            }
                        }

                        database.updateJeu(that.id_jeu, that.gagne_par_joueur, that.joueur_au_service, that.score_echanges_joueur_1, that.score_echanges_joueur_2, that.etat_Jeu)
                            .then((nbRowsAffected) => {
                                if (nbRowsAffected <= 0) {
                                    return console.log('Critical Error : Unable to update all infos of jeu', that.id_jeu);
                                }
                            })
                            .catch((errMsg) => {
                                return console.log(errMsg);
                            });

                        // Si l'échange est terminé et que le jeu n'est pas fini, on commence un nouvel échange
                        if(this.etat_Jeu !== 1){
                            that.echange = undefined;
                            that.initNewEchange();
                        }
                    }
                }).catch((errMsg) => {
                    return console.log(errMsg);
                });
        }
    }

    toJSON () {
        return {
            'id_jeu': this.id_jeu,
            'id_manche': this.id_manche,
            'gagne_par_joueur': this.gagne_par_joueur,
            'joueur_au_service': this.joueur_au_service,
            'score_echanges_joueur_1': this.score_echanges_joueur_1,
            'score_echanges_joueur_2': this.score_echanges_joueur_2,
            'etat_Jeu': this.etat_Jeu
        };
    }
}

function incrementScoreJeu(score){
    switch(score){
        case 0:
            return 15;
        case 15:
            return 30;
        case 30:
            return 40;
        default:
            return -1;
    }
}

module.exports = Jeu;