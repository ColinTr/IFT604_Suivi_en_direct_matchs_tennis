import React, {Component} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import logo from '../assets/images/tennis_raquette.png';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import * as Swal from "sweetalert2";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            nom_utilisateur: "",
            token: props.token
        };

        this.Connexion = this.Connexion.bind(this);
    }

    handleChangeNom = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    Connexion() {
        let that = this;
        if (this.state.nom_utilisateur === "") {
            document.getElementById("NomVide").style.display = 'block';
        } else if (this.state.nom_utilisateur !== "") {
            let url = 'http://localhost:3000/utilisateurs/' + that.state.nom_utilisateur + '/' + that.state.token;
            axios.get(url)
                .then(response => {
                    if( response.status === 200 ) {
                        localStorage.setItem('nomUtilisateur', that.state.nom_utilisateur);
                        localStorage.setItem('idUtilisateur', response.data.id_utilisateur);
                        that.setState({redirect: true})
                    } else if ( response.status === 400 ) {
                        Swal.fire({
                            title: 'Erreur!',
                            text: response.data,
                            icon: 'error',
                            confirmButtonText: 'Cancel'
                        })
                    }
                })
                // Catch any error here
                .catch(error => {
                    Swal.fire({
                        title: 'Erreur!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Cancel'
                    })
                });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        return (
            <MDBContainer>
                <MDBRow className="d-flex justify-content-center">
                    <MDBCol md="6">
                        <form>
                            <div className="text-center">
                                <img src={logo} alt="Logo" height="100px"/>
                            </div>
                            <p className="h5 text-center mb-4">Connexion</p>
                            <div className="grey-text">
                                <MDBInput label="Nom d'utilisateur" validate error="wrong" success="right"
                                          name="nom_utilisateur"
                                          value={this.state.nom_utilisateur} onChange={this.handleChangeNom}/>
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={this.Connexion}>Entrer</MDBBtn>
                            </div>
                            <div className="red-text">
                                <p className="text-center" style={{display: 'none'}} id="NomVide">Merci de rentrer un
                                    nom d'utilisateur</p>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login;
