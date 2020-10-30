/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const router = express.Router();

const Partie = require('../modeles/partie.js');
const Joueur = require('../modeles/joueur.js');

const admin_firebase = require('../utils/firebase');
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

/* GET home page. */
router.get('/', function (req, res, next) {
    // TODO
    const p = new Partie(new Joueur('Albert', 'Ramos', 28, 56, 'Espagne'), new Joueur('Milos', 'Raonic', 28, 16, 'Canada'), '1', 'hale', '12h30');
    // res.send('Bienvenu dans le serveur du service Échanges.');
    res.send(p);
});

router.get('/sendTestNotification', function (req, res, next)  {
    admin_firebase.sendTestNotification()
        .then( msg => {
            res.send(msg);
        }).catch(errMsg => {
            res.send(errMsg);
        });
});

module.exports = router;
