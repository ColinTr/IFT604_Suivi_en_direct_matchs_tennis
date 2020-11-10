import React, { Component } from 'react';

import Login from "./Login"
import ListeParties from "./ListeParties"

class Accueil extends Component {

    render(){
        return(
            <div className="mt-3">
                <Login/>
                <ListeParties/>
            </div>
        )
    }
}

export default Accueil;