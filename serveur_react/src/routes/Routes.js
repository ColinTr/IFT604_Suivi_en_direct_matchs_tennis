import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {MDBAnimation} from 'mdbreact'

import Accueil from "../components/Accueil"
import NoMatch from "../components/NoMatch"
import Joueurs from "../components/Joueurs"

const Routes = () => {
    return (
        <MDBAnimation type="fadeIn">
            <Switch>
                <Route path='/' exact component={Accueil}/>
                <Route path='/joueurs' component={Joueurs}/>
                <Route component={NoMatch}/>
            </Switch>
        </MDBAnimation>
    )
};

export default Routes