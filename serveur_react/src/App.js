import React, {Component} from 'react';

import Navbar from "./components/Navbar"
import Routes from "./routes/Routes"
import * as NotificationApiUsage from "./notification/NotificationApiUsage";
import * as Swal from "sweetalert2";

class App extends Component {
    constructor(props) {
        super(props);

        // Partie client du SSE (Server Sent Events)
        // Crée une connection HTTP avec le server
        // Les messages reçus sont en format event stream
        this.eventSource = new EventSource("http://localhost:3000/SSE");
        this.eventSource.addEventListener('open', () => console.log('Connected to the SSE Server at http://localhost:3000/SSE'));
    }

    componentDidMount() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
                .then(function(registration) {
                    console.log("Firebase service worker registration successful, scope is:", registration.scope);

                    navigator.serviceWorker.addEventListener("message", (message) => {
                        console.log("Worker received firebase notification : " + message);
                        const body = (message.data.firebaseMessaging !== undefined ? (message.data.firebaseMessaging.payload.notification !== undefined ? message.data.firebaseMessaging.payload.notification.body : message.data.firebaseMessaging.payload.data.body) : message.data.data.body);
                        const title = (message.data.firebaseMessaging !== undefined ? (message.data.firebaseMessaging.payload.notification !== undefined ? message.data.firebaseMessaging.payload.notification.title : message.data.firebaseMessaging.payload.data.title) : message.data.data.title);
                        Swal.fire({
                            title: title,
                            text: body,
                            icon: 'info',
                            confirmButtonText: 'Cancel'
                        })
                    });
                })
                .catch(function(err) {
                    console.log("Service worker registration failed, error:", err);
                });
        }

        // Lorsqu'on reçoit un SSE
        this.eventSource = new EventSource("http://localhost:3000/SSE");
        this.eventSource.addEventListener('open', () => console.log('Connected to the SSE Server at http://localhost:3000/SSE'));
        this.eventSource.onmessage = event => {
            console.log("Received SSE : " + event.data);

            NotificationApiUsage.creerNotification(event.data);
        };
    };

    render() {
        return (
            <div>
                <Navbar/>
                <Routes/>
            </div>
        );
    }
}

export default App;
