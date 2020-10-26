/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const gen = require('../generateur');

const database = require('../database');

//GET Le serveur renvoie l’id_utilisateur correspondant.
router.get('/:nom_utilisateur', (req, res) =>{
    // On vérifie si l'utilisateur existe
    database.findIdUtilisateurByNomUtilisateur(req.params['nom_utilisateur'], function(idUtilisateur) {
        // S'il n'existe pas, on le crée
        if(idUtilisateur === undefined){
            database.insertUtilisateur(req.params['nom_utilisateur'], function (lastInsertedId) {
                console.log(`Created user`, lastInsertedId);
                // Et on renvoie l'id de l'utilisateur ainsi créé
                res.send(`{ id_utilisateur : ` + lastInsertedId + `}`);
            });
        }
        else{
            userId = idUtilisateur;
            console.log(`Found user`, idUtilisateur);
            // Sinon on renvoie l'id de l'utilisateur créé
            res.send(`{ id_utilisateur : ` + idUtilisateur + `}`);
        }
    });
});

//UPDATE Le serveur modifie le nom de l'utilisateur correspondant.
router.put('/', (req, res) =>{
    // TODO
});

//DELETE Le serveur supprime l'utilisateur correspondant.
router.delete('/:id_utilisateur', (req, res) =>{
    database.deleteUtilisateur(req.params['id_utilisateur'], function (numberOfUpdatedRows) {
        if(numberOfUpdatedRows === 0){
            console.log('Unable to delete user : No user with id', req.params['id_utilisateur'], 'were found in database');
            res.status(400); // Bad request status code
        } else {
            console.log('User of id', req.params['id_utilisateur'], 'deleted from database');
            res.status(204); // No content status code
        }
        res.end();
    });
});

module.exports = router;