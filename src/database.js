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

exports.creerJoueur = function creerJoueur(nomJoueur, callback){
    // TODO
};

exports.updateNomJoueur = function updateNomJoueur(idJoueur, callback){
    // TODO
};

// ============================== Partie ==============================

exports.creerPartie = function creerPartie(idPartie, idJoueur1, idJoueur2, dateTimeDebutPartie, dateTimeFinPartie, etatPartie, callback){
    // TODO
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

exports.creerManche = function creerManche(idPartie, callback){
    // TODO
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

exports.creerJeu = function creerJeu(idManche, callback){
    // TODO
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

exports.creerEchange = function creerEchange(idJeu, callback){
    // TODO
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
    // TODO
};

// ============================== Utilisateur ==============================

exports.findIdUtilisateurByNomUtilisateur = function findIdUtilisateurByNomUtilisateur(username, callback) {
    db.get(`SELECT * FROM utilisateur WHERE nom_utilisateur = ?`, [username], (err, row) => {
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

exports.insertUtilisateur = function insertUtilisateur(username, callback){
    db.run(`INSERT INTO utilisateur(nom_utilisateur) VALUES(?)`, [username], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the last insert id
        callback(this.lastID);
    });
};

exports.deleteUtilisateur = function deleteUtilisateur(id_utilisateur, callback){
    db.run(`DELETE FROM utilisateur WHERE id_utilisateur = ?`, [id_utilisateur], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // return the number of rows deleted
        callback(this.changes);
    });
};