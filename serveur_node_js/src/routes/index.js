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

const admin_firebase = require('../utils/firebase_push_notification');
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
const message = {
    data:{
        title:"TESTTEST!",
        body:"Test"
    }
};
const test_token = "c0__q85hQTChessi_LTDrk:APA91bGQUcHC7ilnyi952sHEIqiQqXdHeU8FDcT_D_WW5S7v_CBlJIfe82ltvocoodTlRvuNMuvn0LHdBdKlaUKMURw7475dHHK6eUnLHo8YGch6inTytNv0rx2B1Ez9z5IDaMo9egfK";
router.get('/sendTestNotification', function (req, res, next)  {
    admin_firebase.sendNotification(message, test_token)
        .then( msg => {
            res.send(msg);
        }).catch(errMsg => {
            res.send(errMsg);
        });
});

module.exports = router;
