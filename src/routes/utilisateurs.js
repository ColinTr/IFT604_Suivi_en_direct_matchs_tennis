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
    database.trouverIdUtilisateurViaNomUtilisateur(req.params['nom_utilisateur'])
        .then((idUtilisateur)=> {
            userId = idUtilisateur;
            console.log(`Found user`, idUtilisateur);
            // Sinon on renvoie l'id de l'utilisateur créé
            return res.send(`{ id_utilisateur : ` + idUtilisateur + `}`);
        })
        .catch((erreur)=>{
            database.creerUtilisateur(req.params['nom_utilisateur'])
                .then((lastInsertedId) => {
                    console.log(`Created user`, lastInsertedId);
                    // Et on renvoie l'id de l'utilisateur ainsi créé
                    res.send(`{ id_utilisateur : ` + lastInsertedId + `}`);
                }).catch((errMsg) => {
                    return res.send(`{ erreur : ` + errMsg + `}`);
                });
        });
});


//UPDATE Le serveur modifie le nom de l'utilisateur correspondant.
router.put('/', (req, res) =>{
    if(req.body.id_utilisateur === undefined || req.body.nom_utilisateur === undefined) {
        res.status(400).end(); // Bad request status code
        return;
    }

    database.updateNomUtilisateur(req.body.id_utilisateur, req.body.nom_utilisateur)
        .then((nbRowsAffected) => {
            if(nbRowsAffected === 0){
                console.log('Unable to update name of user : No user with id', req.body.id_utilisateur, 'were found in database');
                return res.status(400).end(); // Bad request status code
            } else {
                console.log('Name of user', req.body.id_utilisateur, 'updated');
                return res.status(200).end(); // OK status code
            }
        }).catch((errMsg) => {
            return console.log(errMsg);
        });
});

//DELETE Le serveur supprime l'utilisateur correspondant.
router.delete('/:id_utilisateur', (req, res) =>{
    database.supprimerUtilisateur(req.params['id_utilisateur'])
        .then((numberOfUpdatedRows) => {
            if(numberOfUpdatedRows === 0){
                console.log('Unable to delete user : No user with id', req.params['id_utilisateur'], 'were found in database');
                return res.status(400).end(); // Bad request status code
            } else {
                console.log('User of id', req.params['id_utilisateur'], 'deleted from database');
                return res.status(204).end(); // No content status code
            }
        }).catch((errMsg) => {
            return console.log(errMsg);
        });
});

module.exports = router;