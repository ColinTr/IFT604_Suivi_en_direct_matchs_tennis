importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


var firebaseConfig = {
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
