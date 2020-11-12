/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const app = express();
const router = express.Router();

const crypto = require('crypto');

const admin_firebase = require('../utils/firebase_push_notification');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Bienvenue dans le serveur du service Échanges.').end();
});


// ===================== SSE =====================
const SSEManager = require('../utils/SSEManager');

const sseManager = new SSEManager();

/* On enregistre notre instance dans notre application Express, il sera lors possible
   de récupérer celle-ci via la méthode "get"
*/
app.set('sseManager', sseManager);

router.get('/SSE', function (req, res) {
    /* Notre route étant publique nous n'avons pas l'identité de l'utilisateur,
      nous générons donc un identifiant aléatoirement
    */
    const id = crypto.randomBytes(16).toString('hex');

    /* On ouvre la connexion avec notre client */
    sseManager.open(id, res);

    /* On envoie le nombre de clients connectés à l'ensemble des clients */
    sseManager.broadcast({
        id: Date.now(),
        type: 'count',
        data: sseManager.count()
    });

    /* en cas de fermeture de la connexion, on supprime le client de notre manager */
    req.on('close', () => {
        /* En cas de deconnexion on supprime le client de notre manager */
        sseManager.delete(id);
        /* On envoie le nouveau nombre de clients connectés */
        sseManager.broadcast({
            id: Date.now(),
            type: 'count',
            data: sseManager.count()
        });
    });
});

router.get('/broadcastTestSse', function (req, res, next) {
    const message = {"id": 9, "retry": 5000, "data": "message sent by broadcastTestSse route"};
    sseManager.broadcast(message);
    res.send("ok");
});
// ===============================================

const message = {
    data: {
        title: "New Notification!",
        body: "Test"
    }
};

router.get('/sendTestNotification/:token', function (req, res, next) {
    if (req.params['token'] === undefined) {
        res.send("missing token");
    } else {
        admin_firebase.sendNotification(message, req.params['token'])
            .then(msg => {
                res.send(msg);
            }).catch(errMsg => {
                res.send(errMsg);
            });
    }
});

router.get('/sendTestCode/:code', function (req, res, next) {
    if (req.params['code'] === undefined) {
        res.send("missing code");
    } else {
        res.status(req.params['code']).send("here you go bruh");
    }
});

module.exports = router;

module.exports.getApp = function getApp() {
    return app;
};
