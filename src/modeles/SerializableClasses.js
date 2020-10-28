/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const database = require('../utils/database');
const Echange = require('../modeles/echange');

class SerializablePartie {
    constructor(id_partie, terrain, tournoi, datetime_debut_partie, datetime_fin_partie, etat_partie, temps_partie, id_joueur_1, id_joueur_2) {
        this.id_partie = id_partie;
        this.terrain = terrain;
        this.tournoi = tournoi;
        this.datetime_debut_partie = datetime_debut_partie;
        this.datetime_fin_partie = datetime_fin_partie;
        this.etat_partie = etat_partie;
        this.temps_partie = temps_partie;
        this.id_joueur_1 = id_joueur_1;
        this.id_joueur_2 = id_joueur_2;
        this.joueur1 = undefined;
        this.joueur2 = undefined;
        this.liste_manches = []
    }

    initPartieSerializable() {
        let that = this;

        return new Promise(((resolve, reject) => {
            // On récupère les joueurs
            database.trouverJoueurViaIdJoueur(that.id_joueur_1)
                .then((db_joueur_1) => {
                    if(db_joueur_1 !== undefined){
                        database.trouverJoueurViaIdJoueur(that.id_joueur_2)
                            .then((db_joueur_2) => {
                                if(db_joueur_2 !== undefined){
                                    that.joueur1 = db_joueur_1;
                                    that.joueur2 = db_joueur_2;
                                    // On récupère les manches de la partie
                                    database.recupererToutesLesManchesDePartie(that.id_partie)
                                        .then(mancheRows => {
                                            let promises = [];
                                            mancheRows.forEach(function(mancheRow) {
                                                // On initialise chaque manche
                                                that.liste_manches.push(new SerializableManche(mancheRow.id_manche, mancheRow.score_jeux_joueur_1, mancheRow.score_jeux_joueur_2, mancheRow.nb_contestations_joueur_1, mancheRow.nb_contestations_joueur_2, mancheRow.etat_manche));
                                                promises.push(that.liste_manches[that.liste_manches.length-1].initMancheSerializable());
                                            });

                                            // On attend que toutes les manches se soient initilisées
                                            Promise.allSettled(promises)
                                                .then(()=>{
                                                    // Lorsque c'est bon, on résoud la promesse
                                                    resolve();
                                                }).catch((errMsg) => {
                                                    reject(errMsg);
                                                });
                                        }).catch((errMsg) => {
                                            reject(errMsg);
                                        });
                                } else {
                                    reject('Unable to create Partie : No joueur with id' + that.id_joueur_2 + 'were found in database');
                                }
                            }).catch((errMsg) => {
                                reject(errMsg);
                            });
                    } else {
                        reject('Unable to create Partie : No joueur with id' + that.id_joueur_1 + 'were found in database');
                    }
                }).catch((errMsg) => {
                    reject(errMsg);
                });
        }));
    }

    toJSON () {
        return {
            'id_partie': this.id_partie,
            'joueur1': this.joueur1,
            'joueur2': this.joueur2,
            'datetime_debut_partie': this.datetime_debut_partie,
            'datetime_fin_partie': this.datetime_fin_partie,
            'etat_partie': this.etat_partie,
            'temps_partie': this.temps_partie,
            'liste_manches': this.liste_manches
        };
    }
}

class SerializableManche {
    constructor(id_manche, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche) {
        this.id_manche = id_manche;
        this.score_jeux_joueur_1 = score_jeux_joueur_1;
        this.score_jeux_joueur_2 = score_jeux_joueur_2;
        this.nb_contestations_joueur_1 = nb_contestations_joueur_1;
        this.nb_contestations_joueur_2 = nb_contestations_joueur_2;
        this.etat_manche = etat_manche;
        this.liste_jeux = [];
    }

    initMancheSerializable() {
        let that = this;
        return new Promise(((resolve, reject) => {
            // On récupère les jeux de la manche
            database.recupererTousLesJeuxDeLaManche(that.id_manche)
                .then(jeuRows => {
                    let promises = [];
                    jeuRows.forEach(function(jeuRow) {
                        // On initialise la manche
                        that.liste_jeux.push(new SerializableJeu(jeuRow.id_jeu, jeuRow.gagne_par_joueur, jeuRow.joueur_au_service, jeuRow.score_echanges_joueur_1, jeuRow.score_echanges_joueur_2, jeuRow.etat_jeu));
                        promises.push(that.liste_jeux[that.liste_jeux.length-1].initJeuSerializable());
                    });
                    Promise.allSettled(promises)
                        .then(()=>{
                            resolve();
                        }).catch((errMsg) => {
                            reject(errMsg);
                        });
                }).catch((errMsg) => {
                    reject(errMsg);
                });
        }));
    }

    toJSON () {
        return {
            'id_manche': this.id_manche,
            'score_jeux_joueur_1': this.score_jeux_joueur_1,
            'score_jeux_joueur_2': this.score_jeux_joueur_2,
            'nb_contestations_joueur_1': this.nb_contestations_joueur_1,
            'nb_contestations_joueur_2': this.nb_contestations_joueur_2,
            'etat_manche': this.etat_manche,
            'liste_jeux': this.liste_jeux
        };
    }
}

class SerializableJeu {
    constructor(id_jeu, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu) {
        this.id_jeu = id_jeu;
        this.gagne_par_joueur = gagne_par_joueur;
        this.joueur_au_service = joueur_au_service;
        this.score_echanges_joueur_1 = score_echanges_joueur_1;
        this.score_echanges_joueur_2 = score_echanges_joueur_2;
        this.etat_jeu = etat_jeu;
        this.list_echanges = [];
    }

    initJeuSerializable() {
        let that = this;
        return new Promise(((resolve, reject) => {
            // On récupère les echanges du jeu
            database.recupererTousLesEchangesDuJeu(that.id_jeu)
                .then(echangeRows => {
                    echangeRows.forEach(function(echangeRow) {
                        that.list_echanges.push(new Echange(undefined, echangeRow.id_echange, echangeRow.id_jeu, echangeRow.gagne_par_joueur, echangeRow.conteste_par_joueur, echangeRow.contestation_acceptee, echangeRow.etat_echange, echangeRow.vitesse_service, echangeRow.nombre_coup_echange));
                    });
                    resolve();
                }).catch((errMsg) => {
                    reject(errMsg);
                });
        }));
    }

    toJSON () {
        return {
            'id_jeu': this.id_jeu,
            'gagne_par_joueur': this.gagne_par_joueur,
            'joueur_au_service': this.joueur_au_service,
            'score_echanges_joueur_1': this.score_echanges_joueur_1,
            'score_echanges_joueur_2': this.score_echanges_joueur_2,
            'etat_Jeu': this.etat_jeu,
            'list_echanges': this.list_echanges
        };
    }
}

module.exports = {
    SerializablePartie : SerializablePartie,
    SerializableManche : SerializableManche,
    SerializableJeu : SerializableJeu
};