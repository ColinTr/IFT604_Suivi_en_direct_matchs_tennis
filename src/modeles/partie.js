/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../utils/database');
const Manche = require('./manche');
const dateTimeUtils = require('../utils/dateTimeUtils');

class Partie {
    constructor(id_partie, joueur1, joueur2, terrain, tournoi, datetime_debut_partie, datetime_fin_partie, etat_partie, score_manche_joueur_1, score_manche_joueur_2, tickDebut) {
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
        this.modificateurVitesse = Math.max(process.argv[2], 1);

        this.manche = undefined;

        //
    }

    initNewManche() {
        return new Promise((resolve, reject) => {
            let that = this;
            let newManche = new Manche(this,-1, that.id_partie, 0, 0, 3, 3,0);
            database.creerManche(newManche.id_partie, newManche.score_jeux_joueur_1, newManche.score_jeux_joueur_2, newManche.nb_contestations_joueur_1, newManche.nb_contestations_joueur_2, newManche.etat_manche)
                .then((insertedId) => {
                    newManche.id_manche = insertedId;
                    newManche.initNewJeu(1).then(() => {
                        that.manche = newManche;
                        resolve();
                    })
                    .catch((msg) => {
                        console.log(msg);
                    });
                })
                .catch((msg) => {
                    console.log(msg);
                });
        });
    }

    jouerPartie() {
        let that = this;

        // La partie commence, donc on passe son état à 1 (= "en cours")
        this.etat_partie = 1;
        database.updateEtatPartie(this.id_partie, 1)
            .then((nbRowsAffected) => {
                if (nbRowsAffected <= 0) {
                    return console.log('Critical Error : Unable to update etat_partie of partie ', that.id_partie);
                }
            }).catch((errMsg) => {
                return console.log(errMsg);
            });

        const timer = setInterval(function () {

            if(that.manche !== undefined){

                that.manche.updateManche();

                // Si la manche en cours est terminée, on met à jour les scores
                if(that.manche.etat_manche === 1) {
                    if(that.manche.score_jeux_joueur_1 > that.manche.score_jeux_joueur_2) {
                        that.score_manche_joueur_1 = that.score_manche_joueur_1 + 1;
                    } else {
                        that.score_manche_joueur_2 = that.score_manche_joueur_2 + 1;
                    }

                    // Si l'un des deux joueurs a remporté 2 manches, la partie est terminée
                    if(that.score_manche_joueur_1 >= 2 || that.score_manche_joueur_2 >= 2) {
                        // On passe l'état de la partie à 2 (= "terminée")
                        that.etat_partie = 2;

                        // ==================== GESTION DES PARIS ====================

                        let id_du_joueur_qui_a_gagne = -1;
                        if(that.score_manche_joueur_1 >= 2) {
                            id_du_joueur_qui_a_gagne = that.joueur1.id_joueur;
                        } else {
                            id_du_joueur_qui_a_gagne = that.joueur2.id_joueur;
                        }

                        database.listeParisPourPartie(that.id_partie)
                            .then((rows) => {
                                let sommeDesParis = 0;
                                let sommeDesParisGagnants = 0;
                                rows.forEach(row => {
                                    sommeDesParis = sommeDesParis + row.montant_parie;
                                    if(row.id_joueur === id_du_joueur_qui_a_gagne) {
                                        sommeDesParisGagnants = sommeDesParisGagnants + row.montant_parie;
                                    }
                                });

                                rows.forEach(row => {
                                    let montantGagne = 0;
                                    if(row.id_joueur === id_du_joueur_qui_a_gagne){
                                        montantGagne = row.montant_parie * sommeDesParis * 0.75 / sommeDesParisGagnants;
                                    }

                                    database.updateMontantParisGagnes(row.id_pari, montantGagne)
                                        .then((nbRowsAffected) => {
                                            if(nbRowsAffected <= 0){
                                                return console.log("Critical error : pari of id " + row.id_pari + " couldn\'t be updated.");
                                            } else {
                                                console.log("Sending notification for pari " + row.id_pari + "...");
                                                // TODO Envoyer une notification PUSH du gain réalisé
                                            }
                                        }).catch((msg) => {
                                        return console.log(msg);
                                    });
                                });
                            })
                            .catch((err) => {
                                return console.log('SQL Error in paris : ', err);
                            });

                        // ==================== FIN GESTION DES PARIS ====================

                        // On met à jour la datetime de fin de partie
                        that.datetime_fin_partie = dateTimeUtils.formaterTimeStampEnJson(dateTimeUtils.formaterJsonEnTimeStamp(that.datetime_debut_partie)  + that.temps_partie*1000);
                        database.updateDateTimeFinPartie(that.id_partie, that.datetime_fin_partie)
                            .then((nbRowsAffected) => {
                                if (nbRowsAffected <= 0) {
                                    return console.log('Critical Error : Unable to update datetime_fin_partie of partie', that.id_partie);
                                }
                            }).catch((errMsg) => {
                            return console.log(errMsg);
                        });

                        clearInterval(timer);
                    }

                    database.updatePartie(that.id_partie, that.score_manche_joueur_1, that.score_manche_joueur_2, that.etat_partie)
                        .then((nbRowsAffected) => {
                            if (nbRowsAffected <= 0) {
                                return console.log('Critical Error : Unable to update all infos of partie', that.id_partie);
                            }
                        }).catch((errMsg) => {
                        return console.log(errMsg);
                    });

                    //Si la manche est terminée et que la partie est toujours en cours, on commence une nouvelle manche
                    if(that.manche.etat_manche === 1 && that.etat_partie !== 2) {
                        that.manche = undefined;
                        that.initNewManche();
                    }
                }
            }

            that.temps_partie += Math.floor(Math.random() * 60); // entre 0 et 60 secondes entre chaque point
        }, Math.floor(100 / this.modificateurVitesse));
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