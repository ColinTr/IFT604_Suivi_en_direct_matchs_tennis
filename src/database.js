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


// ============================== Partie ==============================


// ============================== Manche ==============================


// ============================== Jeu ==============================


// ============================== Pari ==============================


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