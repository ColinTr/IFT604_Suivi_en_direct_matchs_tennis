/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const sqlite3 = require('sqlite3').verbose();

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

// ============================== Partie ==============================

exports.creerPartie = function creerPartie(idJoueur1, idJoueur2, dateTimeDebutPartie, dateTimeFinPartie, etatPartie, callback){
    db.run(`INSERT INTO manche(id_joueur_1, id_joueur_2, datetime_debut_partie, datetime_fin_partie, score_manche_joueur_1, score_manche_joueur_2, etat_partie) VALUES(?)`, [idJoueur1, idJoueur2, dateTimeDebutPartie, dateTimeFinPartie, 0, 0, etatPartie], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.updateScoreMancheJoueur1Partie = function updateScoreMancheJoueur1Partie(idPartie, nouveauScore, callback){
    // TODO
};

exports.updateScoreMancheJoueur2Partie = function updateScoreMancheJoueur2Partie(idPartie, nouveauScore, callback){
    // TODO
};

// (0=à_venir, 1=en_cours, 2=terminé)
exports.updateEtatPartie = function updateEtatPartie(idPartie, nouvelEtat, callback){
    // TODO
};

// ============================== Manche ==============================

exports.creerManche = function creerManche(idPartie, etatManche, callback){
    db.run(`INSERT INTO manche(id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche) VALUES(?)`, [idPartie, 0, 0, 3, 3, etatManche], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.updateScoreJeuxJoueur1Manche = function updateScoreJeuxJoueur1Manche(idManche, nouveauScore, callback){
    // TODO
};

exports.updateScoreJeuxJoueur2Manche = function updateScoreJeuxJoueur2Manche(idManche, nouveauScore, callback){
    // TODO
};

exports.updateContestationsJoueur1Manche = function updateContestationsJoueur1Manche(idManche, nouveauNbContestations, callback){
    // TODO
};

exports.updateContestationsJoueur2Manche = function updateContestationsJoueur2Manche(idManche, nouveauNbContestations, callback){
    // TODO
};

// (0=en_cours, 1=terminé)
exports.updateEtatManche = function updateEtatManche(idManche, nouvelEtat, callback){
    // TODO
};

// ============================== Jeu ==============================

exports.creerJeu = function creerJeu(idManche, etatJeu, callback){
    db.run(`INSERT INTO jeu(id_manche, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu) VALUES(?)`, [idManche, 0, 0, etatJeu], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.updateScoreEchangesJoueur1Jeu = function updateScoreEchangesJoueur1Jeu(idJeu, nouveauScore, callback){
    // TODO
};

exports.updateScoreEchangesJoueur2Jeu = function updateScoreEchangesJoueur2Jeu(idJeu, nouveauScore, callback){
    // TODO
};

exports.setJoueurAuServiceJeu = function setJoueurAuServiceJeu(idJeu, idJoueurAuService, callback){
    // TODO
};

// (0=en_cours, 1=terminé)
exports.updateEtatJeu = function updateEtatJeu(idJeu, nouvelEtat, callback){
    // TODO
};

// ============================== Échange ==============================

exports.creerEchange = function creerEchange(idJeu, etatEchange, callback){
    db.run(`INSERT INTO echange(idJeu, etat_echange) VALUES(?)`, [idJeu, etatEchange], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.setGagneParJoueur = function setGagneParJoueur(idEchange, idJoueur, callback){
    // TODO
};

exports.setContesteParJoueur = function setContesteParJoueur(idEchange, idJoueur, callback){
    // TODO
};

// (0=non, 1=oui)
exports.setContestationAcceptee = function setContestationAcceptee(idEchange, bool, callback){
    // TODO
};

// (0=en_cours, 1=terminé)
exports.updateEtatEchange = function updateEtatEchange(idEchange, nouvelEtat, callback){
    // TODO
};

// ============================== Pari ==============================

exports.creerPari = function creerPari(montant, idPartie, idUtilisateur, idJoueur, callback){
    db.run(`INSERT INTO pari(montant, id_partie, id_utilisateur, id_joueur) VALUES(?)`, [montant, idPartie, idUtilisateur, idJoueur], function(err) {
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