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
                    <MDBNavbarNav center>
                        {(navigator.onLine)
                            ?
                            ""
                            :
                            (<MDBNavItem className="OFFLINE">
                                <span>OFFLINE</span>
                                <MDBIcon icon="broadcast-tower" />
                            </MDBNavItem>)
                        }
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        {!localStorage.getItem("nomUtilisateur")
                            ?
                            ""
                            :
                            (
                                <MDBNavItem className="infoUtilisateurNavBar">
                                    <span>{localStorage.getItem('nomUtilisateur')}</span>
                                    <MDBNavLink to="/" icon="times-circle" onClick={() => {
                                        localStorage.clear();
                                    }}>
                                        <MDBIcon className="fa-lg" icon="door-open" />
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
