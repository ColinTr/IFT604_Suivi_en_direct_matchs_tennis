import firebase from 'firebase/app';
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBcQ_eStpGNWjtm8nX5pXvlSc9fq_UQHiI",
        authDomain: "tennisbet2.firebaseapp.com",
        databaseURL: "https://tennisbet2.firebaseio.com",
        projectId: "tennisbet2",
        storageBucket: "tennisbet2.appspot.com",
        messagingSenderId: "994803708124",
        appId: "1:994803708124:web:98940c8df91a0045354419",
        measurementId: "G-6WKF8QFJKX"
});

const messaging = initializedFirebaseApp.messaging();

export { messaging };