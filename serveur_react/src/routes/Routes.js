import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {MDBAnimation} from 'mdbreact'

import AuthRoute from "./AuthRoute";
import Accueil from "../components/Accueil"
import NoMatch from "../components/NoMatch"
import Joueurs from "../components/Joueurs"
import ListeParis from "../components/ListeParis"
import PartieDetaillee from "../components/PartieDetaillee";

const Routes = () => {
    return (
        <MDBAnimation type="fadeIn">
            <Switch>
                <Route path='/' exact component={Accueil}/>
                <Route path='/joueurs' component={Joueurs}/>
                <AuthRoute path='/paris' component={ListeParis}/>
                <AuthRoute path='/parties/:idPartie' component={PartieDetaillee}/>
                <Route component={NoMatch}/>
            </Switch>
        </MDBAnimation>
    )
};

export default Routes