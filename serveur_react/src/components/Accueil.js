import React, { Component } from 'react';

import Login from "./Login"
import ListeParties from "./ListeParties"

class Accueil extends Component {

    render(){
        return(
            <div>
                <Login/>
                <ListeParties/>
            </div>
        )
    }
}

export default Accueil;