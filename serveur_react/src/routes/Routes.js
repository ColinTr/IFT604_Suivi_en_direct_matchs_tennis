import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {MDBAnimation} from 'mdbreact'

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
                <Route path='/paris' component={ListeParis}/>
                <Route path='/parties/:idPartie' component={PartieDetaillee}/>
                <Route component={NoMatch}/>

            </Switch>
        </MDBAnimation>
    )
};

export default Routes