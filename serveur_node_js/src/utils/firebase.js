const admin = require("firebase-admin");

const serviceAccount = require("../tennisbet2-firebase-credentials");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tennisbet2.firebaseio.com"
});

const topic = 'general';

const message = {
    notification: {
        title: 'Message from node',
        body: 'hey there'
    },
    topic: topic
};

exports.sendTestNotification = function sendTestNotification() {
    // Send a message to devices subscribed to the provided topic.
    return new Promise((resolve, reject) => {
        admin.messaging().send(message)
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