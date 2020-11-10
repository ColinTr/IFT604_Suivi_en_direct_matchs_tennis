import React, { Component } from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn} from "mdbreact";
import axios from "axios";
import Swal from 'sweetalert2';

class PartieDetaillee extends Component{

    constructor(props) {
        super(props);
        this.state = {
            idPartie : props.match.params.idPartie,
            nomJoueur1: "",
            idJoueur1: 0,
            nomJoueur2: "",
            idJoueur2: 0,
            rangJoueur1: "",
            rangJoueur2: "",
            dureePartieSecondes : "",
            etatPartie : 0,
            listeManches : []
        }
    }

    intervalID = 1;

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        this.updatePartie(this.state.idPartie);
        this.intervalID = setInterval(() => {
            this.updatePartie(this.state.idPartie);
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updatePartie(idPartie) {
        axios.get('http://localhost:3000/parties/'+idPartie)
            .then(response => {
                const data = response.data
                console.log(response.data)
                this.setState({
                    nomJoueur1 : data.joueur1.prenom + " " + data.joueur1.nom,
                    idJoueur1 : data.joueur1.id_joueur,
                    nomJoueur2 : data.joueur2.prenom + " " + data.joueur2.nom,
                    idJoueur2 : data.joueur2.id_joueur,
                    rangJoueur1 : data.joueur1.rang,
                    rangJoueur2 : data.joueur2.rang,
                    dureePartieSecondes : data.duree_partie,
                    etatPartie : data.etat_partie,
                    listeManches : data.liste_manches,
                    joueurGagnant : data.joueur_gagnant,

                })
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            });
    }

    convertSecondsToStringHourMinuteSecond = (seconds) => {
        let newSeconds = seconds % 60;
        let hour = seconds / 60;
        let minutes = hour % 60;
        hour /= 60;

        return hour.toFixed(0)+" : "+minutes.toFixed(0)+" : "+newSeconds
    }

    ParieJoueur1 = async () => {
        const {value: montant_parie} = await Swal.fire({
            title: 'Parier',
            text: 'Combien voulez-vous parier sur le joueur 1',
            icon: 'info',
            input: 'text',
            inputLabel: 'Montant du pari',
            confirmButtonText: 'Parier',
            cancelButtonText: 'Annuler',
            showCancelButton: true,
            inputValidator: (inputValue) => {
                if (!inputValue) {
                    return 'Veuillez rentrer une valeur'
                }
                if (isNaN(inputValue)) {
                    return 'Veuillez rentrer un chiffre'
                }
            }
        });

        if (montant_parie) {
            const paris = {
                id_utilisateur: localStorage.getItem('idUtilisateur'),
                id_partie: this.state.idPartie,
                id_joueur: this.state.idJoueur1,
                montant_pari: parseInt(montant_parie)
            };

            axios.post('http://localhost:3000/paris', paris)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    ParieJoueur2 = async() => {
        const {value: montant_parie } = await Swal.fire({
            title: 'Parier',
            text: 'Combien voulez-vous parier sur le joueur 2',
            icon: 'info',
            input: 'text',
            inputLabel: 'Montant du pari',
            confirmButtonText: 'Parier',
            cancelButtonText: 'Annuler',
            showCancelButton: true,
            inputValidator: (inputValue) => {
                if(!inputValue){
                    return 'Veuillez rentrer une valeur'
                }
                if(isNaN(inputValue)){
                    return 'Veuillez rentrer un chiffre'
                }
            }
        });

        if (montant_parie) {
            const paris = {
                id_utilisateur: localStorage.getItem('idUtilisateur'),
                id_partie: this.state.idPartie,
                id_joueur: this.state.idJoueur2,
                montant_pari: parseInt(montant_parie)
            };

            axios.post('http://localhost:3000/paris', paris)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    render(){
        return(
            <MDBContainer>
                <MDBRow className="rowMatchEnCours">
                    <MDBCol>
                        <MDBCard className="p-3">
                            <MDBRow>
                                <MDBCol className="heureMatchEnCours" sm="12"><b>{this.convertSecondsToStringHourMinuteSecond(this.state.dureePartieSecondes)}</b></MDBCol>
                            </MDBRow>
                            <MDBRow className="resultatManche">
                                <MDBCol className={this.state.joueurGagnant === 1 ? "resultatMancheNomJoueurs bold" : "resultatMancheNomJoueurs"}>{this.state.nomJoueur1+' ('+this.state.rangJoueur1+')'}</MDBCol>
                                <MDBCol className="resultatMancheScore">
                                    {this.state.listeManches.map(manche => {
                                    return (
                                        <button key={manche.id_manche} type="button"
                                                className={manche.score_jeux_joueur_1 === 6 ? "btn btn-success unclickable" : "btn btn-dark unclickable"}>{manche.score_jeux_joueur_1}</button>
                                    )
                                    })}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="resultatManche">
                                <MDBCol className={this.state.joueurGagnant === 2 ? "resultatMancheNomJoueurs bold" : "resultatMancheNomJoueurs"}>{this.state.nomJoueur2+' ('+this.state.rangJoueur2+')'}</MDBCol>
                                <MDBCol className="resultatMancheScore">{this.state.listeManches.map(manche => {
                                    return (
                                        <button key={manche.id_manche} type="button"
                                                className={manche.score_jeux_joueur_2 === 6 ? "btn btn-success unclickable" : "btn btn-dark unclickable"}>{manche.score_jeux_joueur_2}</button>
                                    )
                                })}</MDBCol>
                            </MDBRow>

                            <MDBRow><MDBCol className="ml-5 m-3"><b>{this.state.etatPartie === 0 ? "Match à venir" : (this.state.etatPartie === 1 ? "Match en cours" : "Match terminé")}</b></MDBCol></MDBRow>

                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">{this.state.nomJoueur1}</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center"></MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">{this.state.nomJoueur2}</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">72</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Points marqués</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">73</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">151</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Vitesse moyenne au service</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">165</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-danger text-center">Contestations</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center"></MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-danger text-center">Contestations</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">2</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Contestations validés</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">0</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">0</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Contestations refusées</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">2</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-1 text-center">Coups échangés :</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">2517</MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center" sm="6">
                                    {(this.state.etatPartie === 0 || (this.state.etatPartie === 1 && this.state.listeManches.length <= 1)) ?
                                        <MDBBtn onClick={this.ParieJoueur1}>Parier</MDBBtn>
                                        : <div></div> }
                                </MDBCol>
                                <MDBCol className="d-flex justify-content-center" sm="6">
                                    {(this.state.etatPartie === 0 || (this.state.etatPartie === 1 && this.state.listeManches.length <= 1)) ?
                                        (<MDBBtn onClick={this.ParieJoueur2}>Parier</MDBBtn>)
                                        : (<div></div>) }
                                </MDBCol>
                            </MDBRow>

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default PartieDetaillee;
