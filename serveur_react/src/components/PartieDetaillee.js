import React, {Component} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn, MDBIcon} from "mdbreact";
import axios from "axios";
import Swal from 'sweetalert2';

class PartieDetaillee extends Component {

    constructor(props) {
        super(props);

        const tempData = JSON.parse(this.props.location.state.mesProps);

        this.state = {
            dataPartie: tempData,
            idPartie: props.match.params.idPartie,
            nomJoueur1: tempData.joueur1.prenom + " " + tempData.joueur1.nom,
            idJoueur1: tempData.joueur1.id_joueur,
            nomJoueur2: tempData.joueur2.prenom + " " + tempData.joueur2.nom,
            idJoueur2: tempData.joueur2.id_joueur,
            rangJoueur1: tempData.joueur1.rang,
            rangJoueur2: tempData.joueur2.rang,
            dureePartieSecondes: tempData.duree_partie,
            etatPartie: tempData.etat_partie,
            listeManches: tempData.liste_manches,
            contestationsAccepteJ1: 0,
            contestationsRefuseJ1: 0,
            contestationsAccepteJ2: 0,
            contestationsRefuseJ2: 0,
            nbCoupsEchanges: 0,
            pointsMarquesJ1: 0,
            pointsMarquesJ2: 0,
            joueurAuService: 0,
            pointsJ1JeuEnCours: 0,
            pointsJ2JeuEnCours: 0,
            vitesseMoyenneServiceJ1 : 0,
            vitesseMoyenneServiceJ2 : 0
        };

        this.updateDataPartie = this.updateDataPartie.bind(this);
        this.updatePartie = this.updatePartie.bind(this);
    }

    intervalID = 1;

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        this.updateDataPartie(this.state.dataPartie);

        this.updatePartie();
        this.intervalID = setInterval(() => {
            this.updatePartie();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updatePartie() {
        if(navigator.onLine) {
            axios.get('http://localhost:3000/parties/' + this.state.idPartie)
                .then(response => {
                    if( response.status === 200 ) {
                        const data = response.data;
                        this.updateDataPartie(data)
                    } else if ( response.status === 400 ) {
                        Swal.fire({
                            title: 'Erreur!',
                            text: response.response.data,
                            icon: 'error',
                            confirmButtonText: 'Cancel'
                        })
                    }
                })
                // Catch any error here
                .catch(error => {
                    Swal.fire({
                        title: 'Erreur!',
                        text: error.response.data.error,
                        icon: 'error',
                        confirmButtonText: 'Cancel'
                    })
                });
        }
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
        let pointsMarquesJ1 = 0;
        let pointsMarquesJ2 = 0;
        let joueurAuService = 0;
        let pointsJ1JeuEnCours = 0;
        let pointsJ2JeuEnCours = 0;
        let vitesseServiceJ1 = 0;
        let vitesseServiceJ2 = 0;


        let nbServiceJ1 = 0;
        let nbServiceJ2 = 0;


        let listesManches = dataPartie.liste_manches;

        listesManches.forEach((manche) => {
            manche.liste_jeux.forEach((jeu) => {

                if(jeu.etat_Jeu === 0) { 
                    joueurAuService = jeu.joueur_au_service; 
                    pointsJ1JeuEnCours = jeu.score_echanges_joueur_1;
                    pointsJ2JeuEnCours = jeu.score_echanges_joueur_2;
                }
                
                jeu.list_echanges.forEach((echange) => {

                    if(jeu.joueur_au_service === 1)
                    {
                        vitesseServiceJ1 = vitesseServiceJ1 + echange.vitesse_service
                        nbServiceJ1 = nbServiceJ1 + 1
                    }else if(jeu.joueur_au_service === 2)
                    {
                        vitesseServiceJ2 = vitesseServiceJ2 + echange.vitesse_service
                        nbServiceJ2 = nbServiceJ2 + 1
                    }

                    nbCoupsEchanges += echange.nombre_coup_echange;

                    //Si echange gagne par joueur 1
                    if (echange.gagne_par_joueur === 1) {
                        pointsMarquesJ1 = pointsMarquesJ1 + 1
                    }//Sinon gagne par joueur 2
                    else {
                        pointsMarquesJ2 = pointsMarquesJ2 + 1
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
            pointsMarquesJ1: pointsMarquesJ1,
            pointsMarquesJ2: pointsMarquesJ2,
            joueurAuService: joueurAuService,
            pointsJ1JeuEnCours: pointsJ1JeuEnCours,
            pointsJ2JeuEnCours: pointsJ2JeuEnCours,
            vitesseMoyenneServiceJ1 : (vitesseServiceJ1/nbServiceJ1).toFixed(1) ,
            vitesseMoyenneServiceJ2 : (vitesseServiceJ2/nbServiceJ2).toFixed(1)
        })
    };

    ParierSurJoueur = async (num_joueur) => {
        console.log(num_joueur)
        const {value: montant_parie} = await Swal.fire({
            title: 'Parier',
            text: "Vous souhaitez parier sur "+(num_joueur === 1 ? this.state.nomJoueur1 : this.state.nomJoueur2)+".",
            icon: 'info',
            input: 'text',
            inputLabel: 'Veuillez saisir un montant :',
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
                id_joueur: (num_joueur === 1 ? this.state.idJoueur1 : this.state.idJoueur2),
                montant_pari: parseInt(montant_parie)
            };

            axios.post('http://localhost:3000/paris', paris)
                .then(response => {
                    if( response.status === 200 ) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 6500,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer);
                                toast.addEventListener('mouseleave', Swal.resumeTimer);
                            }
                        });

                        Toast.fire({
                            icon: 'success',
                            title: 'Votre pari a bien été enregistré !'
                        });
                    } else if ( response.status === 400 ) {
                        Swal.fire({
                            title: 'Erreur!',
                            text: response.response.data,
                            icon: 'error',
                            confirmButtonText: 'Cancel'
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Erreur!',
                        text: error.response.data.error,
                        icon: 'error',
                        confirmButtonText: 'Cancel'
                    })
                });
        }
    };

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
                                        sm="12"><b>{this.state.etatPartie === 0 ? "Match à venir" : this.convertSecondsToStringHourMinuteSecond(this.state.dureePartieSecondes)}</b></MDBCol>
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
                                <MDBCol className="d-flex justify-content-center mb-3 text-center"/>
                                <MDBCol
                                    className="d-flex justify-content-center mb-3 text-center">{this.state.nomJoueur2}</MDBCol>
                            </MDBRow>
                            {(this.state.etatPartie === 1) ?
                                (
                                    <MDBContainer>
                                        <MDBRow><MDBCol className="ml-5 m-3"><b>Stats jeu en cours</b></MDBCol></MDBRow>

                                        <MDBRow>
                                            <MDBCol 
                                                className="d-flex justify-content-center mb-3 text-center text-success">{(this.state.joueurAuService === 1) ? "Service" : ""}</MDBCol>
                                            <MDBCol className="d-flex justify-content-center mb-3 text-center"/>
                                            <MDBCol
                                                className="d-flex justify-content-center mb-3 text-center text-success">{(this.state.joueurAuService === 2) ? "Service" : ""}</MDBCol>
                                        </MDBRow>

                                        <MDBRow>
                                            <MDBCol 
                                                className="d-flex justify-content-center mb-3 text-center">{this.state.pointsJ1JeuEnCours}</MDBCol>
                                            <MDBCol className="d-flex justify-content-center mb-3 text-center">Points</MDBCol>
                                            <MDBCol
                                                className="d-flex justify-content-center mb-3 text-center">{this.state.pointsJ2JeuEnCours}</MDBCol>
                                        </MDBRow>

                                        <MDBRow><MDBCol className="ml-5 m-3"><b>Stats de la partie en cours</b></MDBCol></MDBRow>
                                    </MDBContainer>
                                )
                                : ""

                            }

                            {(this.state.etatPartie === 0) ?
                                ""
                                :
                                (<React.Fragment>
                                    <MDBRow>
                                        <MDBCol
                                            className="d-flex justify-content-center mb-3 text-center">{this.state.pointsMarquesJ1}</MDBCol>
                                        <MDBCol className="d-flex justify-content-center mb-3 text-center">Points
                                            marqués</MDBCol>
                                        <MDBCol
                                            className="d-flex justify-content-center mb-3 text-center">{this.state.pointsMarquesJ2}</MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol className="d-flex justify-content-center mb-3 text-center">{this.state.vitesseMoyenneServiceJ1}</MDBCol>
                                        <MDBCol className="d-flex justify-content-center mb-3 text-center">Vitesse moyenne au
                                            service (km/h)</MDBCol>
                                        <MDBCol className="d-flex justify-content-center mb-3 text-center">{this.state.vitesseMoyenneServiceJ2}</MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol
                                            className="d-flex justify-content-center mb-3 text-danger text-center">Contestations</MDBCol>
                                        <MDBCol className="d-flex justify-content-center mb-3 text-center"/>
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
                                </React.Fragment>)
                             }

                            <MDBRow>
                                <MDBCol className="d-flex justify-content-center mb-3">
                                    {(this.state.etatPartie === 0 || (this.state.etatPartie === 1 && this.state.listeManches.length <= 1)) ?
                                        <MDBBtn onClick={() => this.ParierSurJoueur(1)}>Parier</MDBBtn>
                                        : <div/>}
                                </MDBCol>
                                <MDBCol className="d-flex justify-content-center mb-3 text-center"/>
                                <MDBCol className="d-flex justify-content-center mb-3">
                                    {(this.state.etatPartie === 0 || (this.state.etatPartie === 1 && this.state.listeManches.length <= 1)) ?
                                        (<MDBBtn onClick={() => this.ParierSurJoueur(2)}>Parier</MDBBtn>)
                                        : (<div/>)}
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