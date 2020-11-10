import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard} from "mdbreact";
import axios from "axios";

class PartieDetaillee extends Component{

    constructor(props) {
        super(props);
        this.state = {
            idPartie : props.match.params.idPartie,
            nomJoueur1: "",
            nomJoueur2: "",
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
                    nomJoueur2 : data.joueur2.prenom + " " + data.joueur2.nom,
                    rangJoueur1 : data.joueur1.rang,
                    rangJoueur2 : data.joueur2.rang,
                    dureePartieSecondes : data.duree_partie,
                    etatPartie : data.etat_partie,
                    listeManches : data.liste_manches,

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

    render(){
        return(
            <MDBContainer>
                <MDBRow className="justify-content-center m-2 mt-3">
                    <MDBCol>
                        <MDBCard className="p-3">
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center" sm="12"><b>{this.convertSecondsToStringHourMinuteSecond(this.state.dureePartieSecondes)}</b></MDBCol>
                            </MDBRow>
                            <MDBRow className="d-flex justify-content-center">
                                <MDBCol sm="3">{this.state.nomJoueur1+' ('+this.state.rangJoueur1+')'}</MDBCol>
                                <MDBCol sm="3">
                                    {this.state.listeManches.map(manche => {
                                    return (
                                        <button key={manche.id_manche} type="button"
                                                className={manche.score_jeux_joueur_1 === 6 ? "btn btn-success unclickable" : "btn btn-dark unclickable"}>{manche.score_jeux_joueur_1}</button>
                                    )
                                    })}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="d-flex justify-content-center">
                                <MDBCol sm="3">{this.state.nomJoueur2+' ('+this.state.rangJoueur2+')'}</MDBCol>
                                <MDBCol sm="3">{this.state.listeManches.map(manche => {
                                    return (
                                        <button key={manche.id_manche} type="button"
                                                className={manche.score_jeux_joueur_2 === 6 ? "btn btn-success unclickable" : "btn btn-dark unclickable"}>{manche.score_jeux_joueur_2}</button>
                                    )
                                })}</MDBCol>
                            </MDBRow>

                            <MDBRow><MDBCol><b>{this.state.etatPartie === 0 ? "A venir" : (this.state.etatPartie === 1 ? "En cours" : "Terminée")}</b></MDBCol></MDBRow>

                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center" sm="6" >{this.state.nomJoueur1}</MDBCol>
                                <MDBCol className="d-flex justify-content-center" sm="6">{this.state.nomJoueur2}</MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center" sm="4">72</MDBCol>
                                <MDBCol className="d-flex justify-content-center" sm="4">Points marqués</MDBCol>
                                <MDBCol className="d-flex justify-content-center" sm="4">73</MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center" sm="4">151</MDBCol>
                                <MDBCol className="d-flex justify-content-center" sm="4">Vitesse moyenne au service</MDBCol>
                                <MDBCol className="d-flex justify-content-center" sm="4">165</MDBCol>
                            </MDBRow>

                            <MDBRow >
                                <MDBCol className="d-flex justify-content-center" sm="6">Contestations</MDBCol>
                                <MDBCol className="d-flex justify-content-center" sm="6">Contestations</MDBCol>
                            </MDBRow>

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default PartieDetaillee;