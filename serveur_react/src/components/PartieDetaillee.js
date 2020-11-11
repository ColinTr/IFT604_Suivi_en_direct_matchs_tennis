import React, {Component} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn, MDBIcon} from "mdbreact";
import axios from "axios";
import Swal from 'sweetalert2';

class PartieDetaillee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idPartie: props.match.params.idPartie,
            nomJoueur1: "",
            idJoueur1: 0,
            nomJoueur2: "",
            idJoueur2: 0,
            rangJoueur1: "",
            rangJoueur2: "",
            dureePartieSecondes: "",
            etatPartie: 0,
            listeManches: [],
            contestationsAccepteJ1: 0,
            contestationsRefuseJ1: 0,
            contestationsAccepteJ2: 0,
            contestationsRefuseJ2: 0,
            nbCoupsEchanges: 0,
            pointsMarquesJ1: 0,
            pointsMarquesJ2: 0,
        };
        this.updateDataPartie = this.updateDataPartie.bind(this);
        this.updatePartie = this.updatePartie.bind(this);
    }

    intervalID = 1;

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        this.updatePartie();
        this.intervalID = setInterval(() => {
            this.updatePartie();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updatePartie() {
        axios.get('http://localhost:3000/parties/' + this.state.idPartie)
            .then(response => {
                const data = response.data;
                this.updateDataPartie(data)
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

        return hour.toFixed(0) + " : " + minutes.toFixed(0) + " : " + newSeconds
    };

    updateDataPartie = (dataPartie) => {
        let contestationsAccepteJ1 = 0;
        let contestationsAccepteJ2 = 0;
        let constestationsRefuseJ1 = 0;
        let contestationsRefuseJ2 = 0;
        let nbCoupsEchanges = 0;
        let pointsMarqueJ1 = 0;
        let pointsMarqueJ2 = 0;

        let listesManches = dataPartie.liste_manches;

        listesManches.forEach((manche) => {
            manche.liste_jeux.forEach((jeu) => {
                jeu.list_echanges.forEach((echange) => {
                    nbCoupsEchanges += echange.nombre_coup_echange;

                    //Si echange gagne par joueur 1
                    if (echange.gagne_par_joueur === 1) {
                        pointsMarqueJ1 = pointsMarqueJ1 + 1
                    }//Sinon gagne par joueur 2
                    else {
                        pointsMarqueJ2 = pointsMarqueJ2 + 1
                    }

                    //Contestation refuse du joueur 1
                    if (echange.conteste_par_joueur === 1 && echange.contestation_acceptee === 0) {
                        constestationsRefuseJ1 = constestationsRefuseJ1 + 1
                    }//Contestation accepte du joueur 1
                    else if (echange.conteste_par_joueur === 1 && echange.contestation_acceptee === 1) {
                        contestationsAccepteJ1 = contestationsAccepteJ1 + 1
                    }//Contestation refuse du joueur 2
                    else if (echange.conteste_par_joueur === 2 && echange.contestation_acceptee === 0) {
                        contestationsRefuseJ2 = contestationsRefuseJ2 + 1
                    }//Contestation accepte du joueur 2
                    else if (echange.conteste_par_joueur === 2 && echange.contestation_acceptee === 1) {
                        contestationsAccepteJ2 = contestationsAccepteJ2 + 1
                    }
                })
            })
        });

        this.setState({
            nomJoueur1: dataPartie.joueur1.prenom + " " + dataPartie.joueur1.nom,
            idJoueur1: dataPartie.joueur1.id_joueur,
            nomJoueur2: dataPartie.joueur2.prenom + " " + dataPartie.joueur2.nom,
            idJoueur2: dataPartie.joueur2.id_joueur,
            rangJoueur1: dataPartie.joueur1.rang,
            rangJoueur2: dataPartie.joueur2.rang,
            dureePartieSecondes: dataPartie.duree_partie,
            etatPartie: dataPartie.etat_partie,
            listeManches: dataPartie.liste_manches,
            joueurGagnant: dataPartie.joueur_gagnant,
            contestationsAccepteJ1: contestationsAccepteJ1,
            contestationsRefuseJ1: constestationsRefuseJ1,
            contestationsAccepteJ2: contestationsAccepteJ2,
            contestationsRefuseJ2: contestationsRefuseJ2,
            nbCoupsEchanges: nbCoupsEchanges,
            pointsMarqueJ1: pointsMarqueJ1,
            pointsMarqueJ2: pointsMarqueJ2
        })
    };

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
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Erreur!',
                        text: 'Impossible de créer le pari, la manche 1 est terminé',
                        icon: 'error',
                        confirmButtonText: 'Cancel'
                    })
                });
        }
    }

    ParieJoueur2 = async () => {
        const {value: montant_parie} = await Swal.fire({
            title: 'Parier',
            text: 'Combien voulez-vous parier sur le joueur 2',
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
                id_joueur: this.state.idJoueur2,
                montant_pari: parseInt(montant_parie)
            };

            axios.post('http://localhost:3000/paris', paris)
                .then(res => {
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Erreur!',
                        text: 'Impossible de créer le pari, la manche 1 est terminé',
                        icon: 'error',
                        confirmButtonText: 'Cancel'
                    })
                });
        }
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow className="rowMatchEnCours">
                    <MDBCol size="1">
                        <MDBBtn className="rotate" outline
                                style={{"borderRadius": "50%", "width": "50px", "height": "50px"}}
                                onClick={this.updatePartie}><MDBIcon icon="sync-alt"/></MDBBtn>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard className="p-3">
                            <MDBRow>
                                <MDBCol className="heureMatchEnCours"
                                        sm="12"><b>{this.convertSecondsToStringHourMinuteSecond(this.state.dureePartieSecondes)}</b></MDBCol>
                            </MDBRow>
                            <MDBRow className="resultatManche">
                                <MDBCol
                                    className={this.state.joueurGagnant === 1 ? "resultatMancheNomJoueurs bold" : "resultatMancheNomJoueurs"}>{this.state.nomJoueur1 + ' (' + this.state.rangJoueur1 + ')'}</MDBCol>
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
                                <MDBCol
                                    className={this.state.joueurGagnant === 2 ? "resultatMancheNomJoueurs bold" : "resultatMancheNomJoueurs"}>{this.state.nomJoueur2 + ' (' + this.state.rangJoueur2 + ')'}</MDBCol>
                                <MDBCol className="resultatMancheScore">{this.state.listeManches.map(manche => {
                                    return (
                                        <button key={manche.id_manche} type="button"
                                                className={manche.score_jeux_joueur_2 === 6 ? "btn btn-success unclickable" : "btn btn-dark unclickable"}>{manche.score_jeux_joueur_2}</button>
                                    )
                                })}</MDBCol>
                            </MDBRow>

                            <MDBRow><MDBCol
                                className="ml-5 m-3"><b>{this.state.etatPartie === 0 ? "Match à venir" : (this.state.etatPartie === 1 ? "Match en cours" : "Match terminé")}</b></MDBCol></MDBRow>

                            <MDBRow>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.nomJoueur1}</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center"></MDBCol>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.nomJoueur2}</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.pointsMarquesJ1}</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Points
                                    marqués</MDBCol>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.pointsMarquesJ2}</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">151</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Vitesse moyenne au
                                    service</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">165</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-danger text-center">Contestations</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center"></MDBCol>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-danger text-center">Contestations</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.contestationsAccepteJ1}</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Contestations
                                    validés</MDBCol>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.contestationsAccepteJ2}</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.contestationsRefuseJ1}</MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center">Contestations
                                    refusées</MDBCol>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.contestationsRefuseJ2}</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-1 text-center">Coups échangés
                                    :</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.nbCoupsEchanges}</MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3">
                                    {(this.state.etatPartie === 0 || (this.state.etatPartie === 1 && this.state.listeManches.length <= 1)) ?
                                        <MDBBtn onClick={this.ParieJoueur1}>Parier</MDBBtn>
                                        : <div></div>}
                                </MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center"></MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3">
                                    {(this.state.etatPartie === 0 || (this.state.etatPartie === 1 && this.state.listeManches.length <= 1)) ?
                                        (<MDBBtn onClick={this.ParieJoueur2}>Parier</MDBBtn>)
                                        : (<div></div>)}
                                </MDBCol>
                            </MDBRow>

                        </MDBCard>
                    </MDBCol>
                    <MDBCol size="1">
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default PartieDetaillee;
