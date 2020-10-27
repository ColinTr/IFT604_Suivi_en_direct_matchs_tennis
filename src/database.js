/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const sqlite3 = require('sqlite3').verbose();

const Joueur = require('./modeles/joueur');

let db = new sqlite3.Database('./src/bdd_site.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


// ============================== Joueur ==============================

exports.creerJoueur = function creerJoueur(prenom, nom, age, rang, pays, callback){
    db.run(`INSERT INTO manche(prenom, nom, age, rang, pays) VALUES(?)`, [prenom, nom, age, rang, pays], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.trouverJoueurViaIdJoueur =  function trouverJoueurViaIdJoueur(idJoueur, callback) {
    db.get(`SELECT * FROM joueur_tennis WHERE id_joueur = ?`, [idJoueur], (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        // return the player
        if(row !== undefined){
            const joueur = new Joueur(idJoueur, row.prenom, row.nom, row.age, row.rang, row.pays);
            callback(joueur);
        } else {
            callback(undefined);
        }
    });
};

// ============================== Partie ==============================

exports.creerPartie = function creerPartie(joueur1, joueur2, dateTimeDebutPartie, dateTimeFinPartie, etatPartie, tickDebut, callback){
    db.run(`INSERT INTO partie(id_joueur_1, id_joueur_2, datetime_debut_partie, datetime_fin_partie, score_manche_joueur_1, score_manche_joueur_2, etat_partie) VALUES(?, ?, ?, ?, ?, ?, ?)`, [joueur1.id_joueur, joueur2.id_joueur, dateTimeDebutPartie, dateTimeFinPartie, 0, 0, etatPartie], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // Retourne la partie créée en BDD
        callback(this.lastID);
    });
};

exports.updateScoreMancheJoueur1Partie = function updateScoreMancheJoueur1Partie(idPartie, nouveauScore, callback){
    db.run(`UPDATE partie SET score_manche_joueur_1 = ? WHERE id_partie = ?`, [nouveauScore, idPartie], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.updateScoreMancheJoueur2Partie = function updateScoreMancheJoueur2Partie(idPartie, nouveauScore, callback){
    db.run(`UPDATE partie SET score_manche_joueur_2 = ? WHERE id_partie = ?`, [nouveauScore, idPartie], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// (0=à_venir, 1=en_cours, 2=terminé)
exports.updateEtatPartie = function updateEtatPartie(idPartie, nouvelEtat, callback){
    db.run(`UPDATE partie SET etat_partie = ? WHERE id_partie = ?`, [nouvelEtat, idPartie], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// ============================== Manche ==============================

exports.creerManche = function creerManche(id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche, callback){
    db.run(`INSERT INTO manche(id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche) VALUES(?, ?, ?, ?, ?, ?)`, [id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.updateScoreJeuxJoueur1Manche = function updateScoreJeuxJoueur1Manche(idManche, nouveauScore, callback){
    db.run(`UPDATE manche SET score_jeux_joueur_1 = ? WHERE id_manche = ?`, [nouveauScore, idManche], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.updateScoreJeuxJoueur2Manche = function updateScoreJeuxJoueur2Manche(idManche, nouveauScore, callback){
    db.run(`UPDATE manche SET score_jeux_joueur_2 = ? WHERE id_manche = ?`, [nouveauScore, idManche], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.updateContestationsJoueur1Manche = function updateContestationsJoueur1Manche(idManche, nouveauNbContestations, callback){
    db.run(`UPDATE manche SET nb_contestations_joueur_1 = ? WHERE id_manche = ?`, [nouveauNbContestations, idManche], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.updateContestationsJoueur2Manche = function updateContestationsJoueur2Manche(idManche, nouveauNbContestations, callback){
    db.run(`UPDATE manche SET nb_contestations_joueur_2 = ? WHERE id_manche = ?`, [nouveauNbContestations, idManche], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// (0=en_cours, 1=terminé)
exports.updateEtatManche = function updateEtatManche(idManche, nouvelEtat, callback){
    db.run(`UPDATE manche SET etat_manche = ? WHERE id_manche = ?`, [nouvelEtat, idManche], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// ============================== Jeu ==============================

exports.creerJeu = function creerJeu(id_manche, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu, callback){
    db.run(`INSERT INTO jeu(id_manche, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu) VALUES(?, ?, ?, ?, ?, ?)`, [id_manche, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.updateScoreEchangesJoueur1Jeu = function updateScoreEchangesJoueur1Jeu(idJeu, nouveauScore, callback){
    db.run(`UPDATE jeu SET score_echanges_joueur_1 = ? WHERE id_jeu = ?`, [nouveauScore, idJeu], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.updateScoreEchangesJoueur2Jeu = function updateScoreEchangesJoueur2Jeu(idJeu, nouveauScore, callback){
    db.run(`UPDATE jeu SET score_echanges_joueur_2 = ? WHERE id_jeu = ?`, [nouveauScore, idJeu], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.setJeuGagneParJoueur = function setJeuGagneParJoueur(idJeu, gagneParJoueur, callback){
    db.run(`UPDATE jeu SET gagne_par_joueur = ? WHERE id_jeu = ?`, [gagneParJoueur, idJeu], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// (0=en_cours, 1=terminé)
exports.updateEtatJeu = function updateEtatJeu(idJeu, nouvelEtat, callback){
    db.run(`UPDATE jeu SET etat_jeu = ? WHERE id_jeu = ?`, [nouvelEtat, idJeu], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// ============================== Échange ==============================

exports.creerEchange = function creerEchange(id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange, callback){
    db.run(`INSERT INTO echange(id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange) VALUES(?, ?, ?, ?, ?, ?, ?)`, [id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.updateEchange = function updateEchange(idEchange, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etatEchange, vitesse_service, nombre_coup_echange, callback){
    db.run(`UPDATE echange SET gagne_par_joueur = ?, conteste_par_joueur = ?,  contestation_acceptee = ?, etat_echange = ?, vitesse_service = ?, nombre_coup_echange = ? WHERE id_echange = ?`, [gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etatEchange, vitesse_service, nombre_coup_echange, idEchange], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.setGagneParJoueur = function setGagneParJoueur(idEchange, idJoueur, callback){
    db.run(`UPDATE echange SET gagne_par_joueur = ? WHERE id_echange = ?`, [idJoueur, idEchange], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.setContesteParJoueur = function setContesteParJoueur(idEchange, idJoueur, callback){
    db.run(`UPDATE echange SET conteste_par_joueur = ? WHERE id_echange = ?`, [idJoueur, idEchange], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// (0=non, 1=oui)
exports.setContestationAcceptee = function setContestationAcceptee(idEchange, bool, callback){
    db.run(`UPDATE echange SET contestation_acceptee = ? WHERE id_echange = ?`, [bool, idEchange], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// (0=en_cours, 1=terminé)
exports.updateEtatEchange = function updateEtatEchange(idEchange, nouvelEtat, callback){
    db.run(`UPDATE echange SET etat_echange = ? WHERE id_echange = ?`, [nouvelEtat, idEchange], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

// ============================== Pari ==============================

exports.creerPari = function creerPari(montant, idPartie, idUtilisateur, idJoueur, callback){
    db.run(`INSERT INTO pari(montant, id_partie, id_utilisateur, id_joueur) VALUES(?, ?, ?, ?)`, [montant, idPartie, idUtilisateur, idJoueur], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

// ============================== Utilisateur ==============================

exports.creerUtilisateur = function creerUtilisateur(nomUtilisateur, callback){
    db.run(`INSERT INTO utilisateur(nom_utilisateur) VALUES(?)`, [nomUtilisateur], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.trouverIdUtilisateurViaNomUtilisateur = function trouverIdUtilisateurViaNomUtilisateur(nomUtilisateur, callback) {
    db.get(`SELECT * FROM utilisateur WHERE nom_utilisateur = ?`, [nomUtilisateur], (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        // return the found id
        if(row !== undefined){
            callback(row.id_utilisateur);
        } else {
            callback(undefined);
        }
    });
};

exports.updateNomUtilisateur = function updateNomUtilisateur(idUtilisateur, nouveauNomUtilisateur, callback){
    db.run(`UPDATE utilisateur SET nom_utilisateur = ? WHERE id_utilisateur = ?`, [nouveauNomUtilisateur, idUtilisateur], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows updated
        callback(this.changes);
    });
};

exports.supprimerUtilisateur = function supprimerUtilisateur(idUtilisateur, callback){
    db.run(`DELETE FROM utilisateur WHERE id_utilisateur = ?`, [idUtilisateur], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows deleted
        callback(this.changes);
    });
};

