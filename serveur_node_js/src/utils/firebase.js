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
    }
};

exports.sendTestNotification = function sendTestNotification() {
    // Send a message to devices subscribed to the provided topic.
    return new Promise((resolve, reject) => {
        admin.messaging().sendToDevice("c3W_9NgzT9W_oe99yzCCwz:APA91bGfiMwbzLUyZeyGSS6N8yK5EF46I0I5pGi2Vwz2P7vbo_-vPRo05KaqsjqThuv6Si5S2KvsrdiA-OtcQc-_O6h_0VyeEEZGjOvOZ44Y4jxxZUK7jb0rGiq76aU-KHNQ2b1aeRD0", message)
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