/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../utils/database');

class Echange {
    constructor(parent, id_echange, id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange) {
        this.parent = parent;
        this.id_echange = id_echange;
        this.id_jeu = id_jeu;
        this.gagne_par_joueur = gagne_par_joueur;
        this.conteste_par_joueur = conteste_par_joueur;
        this.contestation_acceptee = contestation_acceptee;
        this.etat_echange = etat_echange;
        this.vitesse_service = Math.floor(Math.random() * (250 - 60 + 1)) + 60; // entre 60 et 250 km/h
        this.nombre_coup_echange = Math.floor(Math.random() * (30 - 1 + 1)) + 1; // entre 1 et 30 coups par échange
    }

    updateEchange(){
        let that = this;
        return new Promise(((resolve, reject) => {
            this.etat_echange = 1;

            that.gagne_par_joueur = Math.floor(Math.random() * 2) + 1; // Renvoie 1 ou 2

            if(that.gagne_par_joueur === 1) {
                if(that.parent.parent.nb_contestations_joueur_2 > 0) {
                    if ((Math.random() * 100) < 3) { // 3% de contestation
                        that.conteste_par_joueur = 2;
                        that.contestation_acceptee = false;
                        if (!((Math.random() * 100) > 25)) { // 75% de chance que la contestation passe
                            console.log('contestation du joueur 2 echouee');
                        } else {
                            that.contestation_acceptee = true;
                            console.log('contestation du joueur 2 reussie');
                        }

                        if (that.contestation_acceptee === true) {
                            that.gagne_par_joueur = 2;
                        } else {
                            that.parent.parent.nb_contestations_joueur_2 = that.parent.parent.nb_contestations_joueur_2 - 1;
                            database.updateContestationsJoueur2Manche(that.parent.parent.id_manche, that.parent.parent.nb_contestations_joueur_2)
                                .then((nbRows) => {
                                    if(nbRows <= 0) {
                                        reject('Critical Error : Unable to update nb_contestations_joueur_2 of manche', that.parent.parent.id_manche);
                                    }
                                }).catch((errMsg) => {
                                    reject(errMsg);
                                });
                        }
                    }
                }
            } else {
                if(this.parent.parent.nb_contestations_joueur_1 > 0) {
                    if ((Math.random() * 100) < 3) { // 3% de contestation
                        that.conteste_par_joueur = 1;
                        that.contestation_acceptee = false;
                        if (!(Math.random() * 100) > 25) { // 75% de chance que la contestation passe
                            console.log('contestation du joueur 1 echouee');
                        } else {
                            that.contestation_acceptee = true;
                            console.log('contestation du joueur 1 reussie');
                        }

                        if (that.contestation_acceptee === true) {
                            that.gagne_par_joueur = 1;
                        } else {
                            that.parent.parent.nb_contestations_joueur_1 = that.parent.parent.nb_contestations_joueur_1 - 1;
                            database.updateContestationsJoueur1Manche(that.parent.parent.id_manche, that.parent.parent.nb_contestations_joueur_1)
                                .then((nbRows) => {
                                    if(nbRows <= 0) {
                                        return console.log('Critical Error : Unable to update nb_contestations_joueur_1 of manche', that.parent.parent.id_manche);
                                    }
                                }).catch((errMsg) => {
                                    reject(errMsg);
                                });
                        }
                    }
                }
            }

            database.updateEchange(that.id_echange, that.gagne_par_joueur, that.conteste_par_joueur, that.contestation_acceptee, that.etat_echange, that.vitesse_service, that.nombre_coup_echange)
                .then((nbRows) => {
                    if(nbRows <= 0) {
                        reject('Critical Error : Unable to update all infos of echange', that.id_echange);
                    }
                    else {
                        resolve();
                    }
                }).catch((errMsg) => {
                    reject(errMsg);
                });
        }));
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