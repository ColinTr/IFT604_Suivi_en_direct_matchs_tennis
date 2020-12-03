/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const sqlite3 = require('sqlite3').verbose();

const Joueur = require('../modeles/joueur');
const datetimeUtils = require('./dateTimeUtils');

let db = new sqlite3.Database('./src/bdd_site.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


// ============================== Joueur ==============================

exports.creerJoueur = function creerJoueur(prenom, nom, age, rang, pays){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO joueur_tennis(prenom, nom, age, rang, pays) VALUES(?, ?, ?, ?, ?)`, [prenom, nom, age, rang, pays], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the last insert id
            resolve(this.lastID);
        });
    });
};

exports.trouverJoueurViaIdJoueur =  function trouverJoueurViaIdJoueur(idJoueur) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM joueur_tennis WHERE id_joueur = ?`, [idJoueur], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the player
            if(row !== undefined){
                const joueur = new Joueur(idJoueur, row.prenom, row.nom, row.age, row.rang, row.pays);
                resolve(joueur);
            } else {
                resolve(undefined);
            }
        });
    });
};

exports.recupererTousLesJoueurs =  function recupererTousLesJoueurs() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM joueur_tennis`, [], (err, rows) => {
            if (err) {
                reject(err.message);
            }
            // return the players
            if(rows !== undefined){
                resolve(rows);
            }
        });
    });
};

// ============================== Partie ==============================

exports.recupererToutesLesPartiesDuJour =  function recupererToutesLesPartiesDuJour() {
//strftime('%Y-%m-%d %H:%M:%S'
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM partie WHERE strftime('%Y-%m-%d', datetime_debut_partie) = strftime('%Y-%m-%d', 'now')`, [], (err, rows) => {
            if (err) {
                reject(err.message);
            }
            // return the parties
            if(rows !== undefined){
                resolve(rows);
            }
        });
    });
};

exports.creerPartie = function creerPartie(joueur1, joueur2, dateTimeDebutPartie, etatPartie, duree_partie){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO partie(id_joueur_1, id_joueur_2, datetime_debut_partie, score_manche_joueur_1, score_manche_joueur_2, etat_partie, duree_partie) VALUES(?, ?, datetime(?, 'unixepoch', 'localtime'), ?, ?, ?, ?)`, [joueur1.id_joueur, joueur2.id_joueur, datetimeUtils.formaterJsonEnTimeStamp(dateTimeDebutPartie)/1000, 0, 0, etatPartie, duree_partie], function(err) {
            if (err) {
                reject(err.message);
            }
            // Retourne la partie créée en BDD
            resolve(this.lastID);
        });
    })
};

exports.updatePartie = function updatePartie(id_partie, score_manche_joueur_1, score_manche_joueur_2, etatPartie, duree_partie){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE partie SET score_manche_joueur_1 = ?, score_manche_joueur_2 = ?, etat_partie = ?, duree_partie = ? WHERE id_partie = ?`, [score_manche_joueur_1, score_manche_joueur_2, etatPartie, duree_partie, id_partie], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.updateDateTimeFinPartie = function updateDateTimeFinPartie(id_partie, dateTimeFinPartie){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE partie SET datetime_fin_partie = datetime(?, 'unixepoch', 'localtime') WHERE id_partie = ?`, [datetimeUtils.formaterJsonEnTimeStamp(dateTimeFinPartie)/1000, id_partie], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

// (0=à_venir, 1=en_cours, 2=terminé)
exports.updateEtatPartie = function updateEtatPartie(idPartie, nouvelEtat){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE partie SET etat_partie = ? WHERE id_partie = ?`, [nouvelEtat, idPartie], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.updateDureePartie = function updateDureePartie(idPartie, duree_partie){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE partie SET duree_partie = ? WHERE id_partie = ?`, [duree_partie, idPartie], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.nombreDeManchesDeLaPartieTerminees = function nombreDeManchesDeLaPartieTerminees(idPartie) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT count(*) as nombreManchesTerminees FROM partie INNER JOIN manche ON partie.id_partie = manche.id_partie WHERE manche.etat_manche = 1 AND partie.id_partie = ?`, [idPartie], (err, row) => {
            if (err) {
                reject(err.message);
            } else {
                // return the found id
                resolve(row.nombreManchesTerminees);
            }
        });
    });
};

exports.idPartieExisteTIl = function idPartieExisteTIl(idPartie) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT count(*) as nombrePartiesAvecId FROM partie WHERE id_partie = ?`, [idPartie], (err, row) => {
            if (err) {
                reject(err.message);
            } else {
                // return the number of parties with idPartie found
                resolve(row.nombrePartiesAvecId);
            }
        });
    });
};

exports.recupererPartieViaId = function recupererPartieViaId(idPartie) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM partie WHERE id_partie = ?`, [idPartie], (err, row) => {
            if (err) {
                reject(err.message);
            } else {
                // return the partie with idPartie found
                resolve(row);
            }
        });
    });
};

exports.recupererToutesLesParties = function recupererToutesLesParties() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM partie`, (err, row) => {
            if (err) {
                reject(err.message);
            } else {
                // return the partie with idPartie found
                resolve(row);
            }
        });
    });
};

// ============================== Manche ==============================

exports.creerManche = function creerManche(id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO manche(id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche) VALUES(?, ?, ?, ?, ?, ?)`, [id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the last insert id
            resolve(this.lastID);
        });
    });
};

exports.updateManche = function updateManche(id_manche, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE manche SET score_jeux_joueur_1 = ?, score_jeux_joueur_2 = ?, nb_contestations_joueur_1 = ?, nb_contestations_joueur_2 = ?, etat_manche = ? WHERE id_manche = ?`, [score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche, id_manche], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.updateContestationsJoueur1Manche = function updateContestationsJoueur1Manche(idManche, nouveauNbContestations){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE manche SET nb_contestations_joueur_1 = ? WHERE id_manche = ?`, [nouveauNbContestations, idManche], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.updateContestationsJoueur2Manche = function updateContestationsJoueur2Manche(idManche, nouveauNbContestations){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE manche SET nb_contestations_joueur_2 = ? WHERE id_manche = ?`, [nouveauNbContestations, idManche], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.recupererToutesLesManchesDePartie = function recupererToutesLesManchesDePartie(idPartie) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM manche WHERE id_partie = ?`, [idPartie], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found manches
            resolve(row);
        });
    });
};

// ============================== Jeu ==============================

exports.creerJeu = function creerJeu(id_manche, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO jeu(id_manche, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu) VALUES(?, ?, ?, ?, ?, ?)`, [id_manche, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the last insert id
            resolve(this.lastID);
        });
    });
};

exports.updateJeu = function updateJeu(id_jeu, gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE jeu SET gagne_par_joueur = ?, joueur_au_service = ?, score_echanges_joueur_1 = ?, score_echanges_joueur_2 = ?, etat_jeu = ? WHERE id_jeu = ?`, [gagne_par_joueur, joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_jeu, id_jeu], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.recupererTousLesJeuxDeLaManche = function recupererTousLesJeuxDeLaManche(idManche) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM jeu WHERE id_manche = ?`, [idManche], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found jeux
            resolve(row);
        });
    });
};

// ============================== Échange ==============================

exports.creerEchange = function creerEchange(id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO echange(id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange) VALUES(?, ?, ?, ?, ?, ?, ?)`, [id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange, vitesse_service, nombre_coup_echange], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the last insert id
            resolve(this.lastID);
        });
    });
};

exports.updateEchange = function updateEchange(idEchange, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etatEchange, vitesse_service, nombre_coup_echange){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE echange SET gagne_par_joueur = ?, conteste_par_joueur = ?,  contestation_acceptee = ?, etat_echange = ?, vitesse_service = ?, nombre_coup_echange = ? WHERE id_echange = ?`, [gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etatEchange, vitesse_service, nombre_coup_echange, idEchange], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.recupererTousLesEchangesDuJeu = function recupererTousLesEchangesDuJeu(idJeu) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM echange WHERE id_jeu = ?`, [idJeu], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found echanges
            resolve(row);
        });
    });
};

// ============================== Pari ==============================

exports.creerPari = function creerPari(montant_parie, montant_gagne, id_partie, idUtilisateur, idJoueur){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO pari(montant_parie, id_partie, id_utilisateur, id_joueur) VALUES(?, ?, ?, ?)`, [montant_parie, id_partie, idUtilisateur, idJoueur], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the last insert id
            resolve(this.lastID);
        });
    });
};

exports.updateMontantParisGagnes = function updateMontantParisGagnes(idPari, montantGagne){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE pari SET montant_gagne = ? WHERE id_pari = ?`, [montantGagne, idPari], (err) => {
            if (err) {
               reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    })
};

exports.listeParisPourPartie = function listeParisPourPartie(idPartie) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM pari WHERE id_partie = ?`, [idPartie], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found id
            resolve(row);
        });
    });
};

exports.listeParisDuJoueurPourPartie = function listeParisDuJoueurPourPartie(idPartie, idUtilisateur) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM pari WHERE id_partie = ? AND id_utilisateur = ?`, [idPartie, idUtilisateur], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found id
            resolve(row);
        });
    });
};

exports.listeParisDuJoueur = function listeParisDuJoueur(idUtilisateur) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM pari WHERE id_utilisateur = ?`, [idUtilisateur], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found id
            resolve(row);
        });
    });
};

// ============================== Utilisateur ==============================

exports.creerUtilisateur = function creerUtilisateur(nomUtilisateur){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO utilisateur(nom_utilisateur) VALUES(?)`, [nomUtilisateur], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the last insert id
            resolve(this.lastID);
        });
    });
};

exports.trouverIdUtilisateurViaNomUtilisateur = function trouverIdUtilisateurViaNomUtilisateur(nomUtilisateur) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM utilisateur WHERE nom_utilisateur = ?`, [nomUtilisateur], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found id
            if(row !== undefined){
                resolve(row.id_utilisateur);
            } else {
                reject(undefined);
            }
        });
    })
};

exports.idUtilisateurExisteTIl = function idUtilisateurExisteTIl(idUtilisateur) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT count(*) as nbUtilAvecCetId FROM utilisateur WHERE id_utilisateur = ?`, [idUtilisateur], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the found id
            resolve(row.nbUtilAvecCetId);
        });
    });
};

exports.updateNomUtilisateur = function updateNomUtilisateur(idUtilisateur, nouveauNomUtilisateur){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE utilisateur SET nom_utilisateur = ? WHERE id_utilisateur = ?`, [nouveauNomUtilisateur, idUtilisateur], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.supprimerUtilisateur = function supprimerUtilisateur(idUtilisateur){
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM utilisateur WHERE id_utilisateur = ?`, [idUtilisateur], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows deleted
            resolve(this.changes);
        });
    });
};

exports.updateTokenUtilisateur = function updateTokenUtilisateur(idUtilisateur, nouveauToken){
    return new Promise((resolve, reject) => {
        db.run(`UPDATE utilisateur SET firebase_token = ? WHERE id_utilisateur = ?`, [nouveauToken, idUtilisateur], function(err) {
            if (err) {
                reject(err.message);
            }
            // return the number of rows updated
            resolve(this.changes);
        });
    });
};

exports.trouverUtilisateurViaIdUtilisateur =  function trouverUtilisateurViaIdUtilisateur(idUtilisateur) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM utilisateur WHERE id_utilisateur = ?`, [idUtilisateur], (err, row) => {
            if (err) {
                reject(err.message);
            }
            // return the user
            if(row !== undefined){
                resolve(row);
            } else {
                resolve(undefined);
            }
        });
    });
};