importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBcQ_eStpGNWjtm8nX5pXvlSc9fq_UQHiI",
    authDomain: "tennisbet2.firebaseapp.com",
    databaseURL: "https://tennisbet2.firebaseio.com",
    projectId: "tennisbet2",
    storageBucket: "tennisbet2.appspot.com",
    messagingSenderId: "994803708124",
    appId: "1:994803708124:web:98940c8df91a0045354419",
    measurementId: "G-6WKF8QFJKX"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true,
        })
        .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("my notification title");
        });
    return promiseChain;
});

self.addEventListener("notificationclick", function(event) {
    console.log(event);
});