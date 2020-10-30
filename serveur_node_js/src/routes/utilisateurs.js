/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const database = require('../utils/database');
const Erreur = require('../utils/erreur');

//GET Le serveur sauvegarde le token et renvoie l’id_utilisateur correspondant.
router.get('/:nom_utilisateur/:firebase_token', (req, res) =>{
    if(req.params['nom_utilisateur'] === undefined || req.params['firebase_token'] === undefined) {
        console.log(new Erreur('Contenu manquant'));
        return res.status(400).send(new Erreur('Contenu manquant')).end();
    }

    recupererIdUtilisateurParNomEtLeCreerSIlNExistePas(req.params['nom_utilisateur'])
        .then((idUtilisateur) => {
            // On met à jour le token de l'utilisateur
            database.updateTokenUtilisateur(idUtilisateur, req.params['firebase_token'])
                .then((nbRowsUpdated) => {
                    if(nbRowsUpdated === 1) {
                        // Et on renvoie l'id de l'utilisateur ainsi créé
                        console.log('Envoi de l\'id utilisateur ' + idUtilisateur);
                        return res.status(200).send(`{ id_utilisateur : ` + idUtilisateur + `}`);
                    } else {
                        console.log("Erreur lors de la mise à jour du token de l\'utilisateur " + idUtilisateur);
                        return res.status(400).send(new Erreur("Erreur lors de la mise à jour du token de l\'utilisateur " + idUtilisateur)).end();
                    }
                }).catch((errMsg) => {
                    console.log(new Erreur(errMsg));
                    return res.status(400).send(new Erreur(errMsg)).end();
                });
        }).catch((errMsg) =>{
            console.log(new Erreur(errMsg));
            return res.status(400).send(new Erreur(errMsg)).end();
        });
});

function recupererIdUtilisateurParNomEtLeCreerSIlNExistePas(nomUtilisateur){
    return new Promise(((resolve, reject) => {
        // On vérifie si l'utilisateur existe
        database.trouverIdUtilisateurViaNomUtilisateur(nomUtilisateur)
            .then((lastInsertedId)=> {
                resolve(lastInsertedId);
            }).catch(() => {
                // Sinon on crée un utilisateur et on envoie son id
                database.creerUtilisateur(nomUtilisateur)
                    .then((lastInsertedId) => {
                        console.log('Utilisateur ' + lastInsertedId + ' créé');
                        resolve(lastInsertedId);
                    }).catch((errMsg) => {
                        console.log(new Erreur(errMsg));
                        reject(errMsg);
                    });
            });
    }))
}


// UPDATE Le serveur modifie le nom de l'utilisateur correspondant.
router.put('/', (req, res) =>{
    if(req.body.id_utilisateur === undefined || req.body.nom_utilisateur === undefined) {
        console.log(new Erreur('Contenu manquant'));
        return res.status(400).send(new Erreur('Contenu manquant')).end();
    }

    database.updateNomUtilisateur(req.body.id_utilisateur, req.body.nom_utilisateur)
        .then((nbRowsAffected) => {
            if(nbRowsAffected === 0){
                console.log('Unable to update name of user : No user with id', req.body.id_utilisateur, 'were found in database');
                return res.status(400).send(new Erreur('Unable to update name of user : No user with id', req.body.id_utilisateur, 'were found in database')).end(); // Bad request status code
            } else {
                console.log('Name of user', req.body.id_utilisateur, 'updated');
                return res.status(200).send(new Erreur('Name of user', req.body.id_utilisateur, 'updated')).end(); // OK status code
            }
        }).catch((errMsg) => {
        console.log(new Erreur(errMsg));
        return res.status(400).send(new Erreur(errMsg)).end();
    });
});

//DELETE Le serveur supprime l'utilisateur correspondant.
router.delete('/:id_utilisateur', (req, res) =>{
    database.supprimerUtilisateur(req.params['id_utilisateur'])
        .then((numberOfUpdatedRows) => {
            if(numberOfUpdatedRows === 0){
                console.log('Unable to delete user : No user with id', req.params['id_utilisateur'], 'were found in database');
                return res.status(400).send(new Erreur('Unable to delete user : No user with id', req.params['id_utilisateur'], 'were found in database')).end(); // Bad request status code
            } else {
                console.log('User of id', req.params['id_utilisateur'], 'deleted from database');
                return res.status(204).send('User of id', req.params['id_utilisateur'], 'deleted from database').end(); // No content status code
            }
        }).catch((errMsg) => {
        console.log(new Erreur(errMsg));
        return res.status(400).send(new Erreur(errMsg)).end();
    });
});

module.exports = router;