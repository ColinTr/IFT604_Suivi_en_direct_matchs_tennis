import React from 'react';

import Navbar from "./components/Navbar"
import Routes from "./routes/Routes"
import * as NotificationApiUsage from "./notification/NotificationApiUsage";

class App extends Component {
    constructor(props) {
        super();

        // Partie client du SSE (Server Sent Events)
        // Crée une connection HTTP avec le server
        // Les messages reçus sont en format event stream
        this.eventSource = new EventSource("http://localhost:3000/SSE");
        this.eventSource.addEventListener('open', () => console.log('Connected to the SSE Server at http://localhost:3000/SSE'));
    }

    componentDidMount() {
        // Lorsqu'on reçoit un message
        this.eventSource = new EventSource("http://localhost:3000/SSE");
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
