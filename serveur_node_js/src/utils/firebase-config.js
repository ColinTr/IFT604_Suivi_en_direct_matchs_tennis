var admin = require("firebase-admin");

var serviceAccount = require("../tennisbet-firebase-credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tennisbet.firebaseio.com"
});