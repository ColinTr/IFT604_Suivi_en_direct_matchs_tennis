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
        admin.messaging().sendToDevice("efgdiZ8YQvWtcJCRX7xmvd:APA91bHWvpKmmkRp7tuKUO7mgEvlE-4j5m5oeBtktkDfkhnYLOl62TCw0krLgZct_VJQSvP-hvMBKFBYNYUh8ALQJNqLNu-IqK7_rBNyaWP0ux6OtV_bsa9usZsyjIp9-49y1J81Bvre", message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response.results[0]);
                resolve('Successfully sent message:' + response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                reject('Error sending message:' + error);
            });
    });
};