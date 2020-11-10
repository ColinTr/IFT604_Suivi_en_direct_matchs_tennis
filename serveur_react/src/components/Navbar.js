import React, {Component} from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBIcon
} from "mdbreact";
import {withRouter} from 'react-router-dom';

class Navbar extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        return (
            <MDBNavbar style={{backgroundColor: "#7D9309"}} dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">Tennis Bet</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse}/>
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBNavLink to="/">Accueil</MDBNavLink>
                        </MDBNavItem>

                        <MDBNavItem>
                            <MDBNavLink to="/joueurs">Joueurs</MDBNavLink>
                        </MDBNavItem>

                        {!localStorage.getItem("nomUtilisateur")
                            ? ""
                            :
                            (<MDBNavItem>
                                <MDBNavLink to="/paris">Paris</MDBNavLink>
                            </MDBNavItem>)
                        }
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        {!localStorage.getItem("nomUtilisateur")
                            ?
                            ""
                            :
                            (
                                <React.Fragment>
                                    <MDBNavItem>
                                        <b>{localStorage.getItem("nomUtilisateur")}</b>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink className="waves-effect waves-light" to="/" onClick={() => {
                                            localStorage.clear();
                                        }}>
                                            Se deconnecter
                                            <MDBIcon className="fa-lg ml-3" icon="user"/>
                                        </MDBNavLink>
                                    </MDBNavItem>
                                </React.Fragment>
                            )
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default withRouter(Navbar);