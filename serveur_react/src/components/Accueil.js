import React, { Component } from 'react';

import Login from "./Login"
import ListeParties from "./ListeParties"
import { messaging } from "./init-fcm";

class Accueil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token : null
        };
    }

    componentDidMount() {
        let that = this;
        messaging.requestPermission()
            .then(async function() {
                const firebase_token = await messaging.getToken();
                that.setState({token : firebase_token})
            })
            .catch(function(err) {
                console.log("Unable to get permission to notify.", err);
            });
    }

    render(){
        return(
            <div className="mt-3">
                {!localStorage.getItem("nomUtilisateur")
                    ?
                    <Login token={this.state.token}/>
                    :
                    <ListeParties/>
                }

            </div>
        )
    }
}

export default Accueil;