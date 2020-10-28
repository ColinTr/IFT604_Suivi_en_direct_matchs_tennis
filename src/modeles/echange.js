/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../database');

class Echange {
    constructor(parent, id_echange, id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange) {
        this.parent = parent;
        this.id_echange = id_echange;
        this.id_jeu = id_jeu;
        this.gagne_par_joueur = gagne_par_joueur;
        this.conteste_par_joueur = conteste_par_joueur;
        this.contestation_acceptee = contestation_acceptee;
        this.etat_echange = etat_echange;
        this.vitesse_service = vitesse_service;
        this.nombre_coup_echange = nombre_coup_echange;
    }

    updateEchange(){
        let that = this;

        this.etat_echange = 1;

        this.gagne_par_joueur = Math.floor(Math.random() * 2) + 1; // Renvoie 1 ou 2

        if(this.gagne_par_joueur === 1) {
            if(this.parent.parent.nb_contestations_joueur_2 > 0) {
                if ((Math.random() * 100) < 3) { // 3% de contestation
                    this.conteste_par_joueur = 2;
                    this.contestation_acceptee = false;
                    if (!(Math.random() * 100) > 25) { // 75% de chance que la contestation passe
                        console.log('contestation du joueur 2 echouee');
                    } else {
                        this.contestation_acceptee = true;
                        console.log('contestation du joueur 2 reussie');
                    }

                    if (this.contestation_acceptee === true) {
                        this.gagne_par_joueur = 2;
                    } else {
                        this.parent.parent.nb_contestations_joueur_2 = this.parent.parent.nb_contestations_joueur_2 - 1;
                        database.updateContestationsJoueur2Manche(this.parent.parent.id_manche, this.parent.parent.nb_contestations_joueur_2)
                            .then((nbRows) => {
                                if(nbRows <= 0) {
                                    return console.log('Critical Error : Unable to update nb_contestations_joueur_2 of manche', that.parent.parent.id_manche);
                                }
                            }).catch((errMsg) => {
                                return console.log(errMsg);
                            });
                    }
                }
            }
        } else {
            if(this.parent.parent.nb_contestations_joueur_1 > 0) {
                if ((Math.random() * 100) < 3) { // 3% de contestation
                    this.conteste_par_joueur = 1;
                    this.contestation_acceptee = false;
                    if (!(Math.random() * 100) > 25) { // 75% de chance que la contestation passe
                        console.log('contestation du joueur 1 echouee');
                    } else {
                        this.contestation_acceptee = true;
                        console.log('contestation du joueur 1 reussie');
                    }

                    if (this.contestation_acceptee === true) {
                        this.gagne_par_joueur = 1;
                    } else {
                        this.parent.parent.nb_contestations_joueur_1 = this.parent.parent.nb_contestations_joueur_1 - 1;
                        database.updateContestationsJoueur1Manche(this.parent.parent.id_manche, this.parent.parent.nb_contestations_joueur_1)
                            .then((nbRows) => {
                                if(nbRows <= 0) {
                                    return console.log('Critical Error : Unable to update nb_contestations_joueur_1 of manche', that.parent.parent.id_manche);
                                }
                            }).catch((errMsg) => {
                                return console.log(errMsg);
                            });
                    }
                }
            }
        }

        this.vitesse_service = Math.floor(Math.random() * (250 - 60 + 1)) + 60; // entre 60 et 250 km/h
        this.nombre_coup_echange = Math.floor(Math.random() * (30 - 1 + 1)) + 1; // entre 1 et 30 coups par échange

        database.updateEchange(this.id_echange, this.gagne_par_joueur, this.conteste_par_joueur, this.contestation_acceptee, this.etat_echange, this.vitesse_service, this.nombre_coup_echange)
            .then((nbRows) => {
                if(nbRows <= 0) {
                    return console.log('Critical Error : Unable to update all infos of echange', that.id_echange);
                }
            }).catch((errMsg) => {
                return console.log(errMsg);
            });
    }

    toJSON () {
        return {
            'id_echange': this.id_echange,
            'id_jeu': this.id_jeu,
            'gagne_par_joueur': this.gagne_par_joueur,
            'conteste_par_joueur': this.conteste_par_joueur,
            'contestation_acceptee': this.contestation_acceptee,
            'etat_echange': this.etat_echange,
            'vitesse_service': this.vitesse_service,
            'nombre_coup_echange': this.nombre_coup_echange
        };
    }
}

module.exports = Echange;