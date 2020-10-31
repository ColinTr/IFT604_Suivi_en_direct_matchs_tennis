const admin = require("firebase-admin");

const serviceAccount = require("../tennisbet2-firebase-credentials");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tennisbet2.firebaseio.com"
});

const message = {
    data: {
        title: 'Message from node',
        body: 'hey there'
    }
};

exports.sendNotification = function sendNotification(message, token) {
    return new Promise((resolve, reject) => {
        admin.messaging().sendToDevice(token, message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                resolve('Successfully sent message:' + response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                reject('Error sending message:' + error);
            });
    });
};