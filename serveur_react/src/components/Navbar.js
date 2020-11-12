import React, {Component} from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse
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
                        {(navigator.onLine)
                            ?
                            ""
                            :
                            (<MDBNavItem className="OFFLINE">
                                <i className="fas fa-broadcast-tower" />
                                <span className="ml-1">OFFLINE</span>
                            </MDBNavItem>)
                        }
                        {!localStorage.getItem("nomUtilisateur")
                            ?
                            ""
                            :
                            (
                                <MDBNavItem className="infoUtilisateurNavBar ml-3">
                                    <span>{localStorage.getItem('nomUtilisateur')}</span>
                                    <MDBNavLink to="/" icon="times-circle" onClick={() => {
                                        localStorage.clear();
                                    }}>
                                        <i className="fas fa-door-open fa-lg" />
                                    </MDBNavLink>
                                </MDBNavItem>
                            )
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default withRouter(Navbar);
