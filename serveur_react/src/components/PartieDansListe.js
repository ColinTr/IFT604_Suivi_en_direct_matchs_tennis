import React, {Component} from "react";
import {MDBRow, MDBCol, MDBContainer} from "mdbreact";

class PartieDansListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomJoueur1: props.data.joueur1.prenom + " " + props.data.joueur1.nom,
            nomJoueur2: props.data.joueur2.prenom + " " + props.data.joueur2.nom,
            joueurGagnant: props.data.joueur_gagnant,
            listeManches: props.data.liste_manches
        };
    }

    render() {
        return (
            <tr>
                <td>
                    <MDBRow>
                        <MDBContainer className='d-flex align-items-center'>
                            <MDBCol className={this.state.joueurGagnant === 1 ? "font-weight-bold" : ""}>
                                {this.state.nomJoueur1}
                            </MDBCol>
                            <MDBCol>
                                {this.state.listeManches.map(manche => {
                                    return (
                                        <button key={manche.id_manche} type="button"
                                                className={manche.score_jeux_joueur_1 === 6 ? "btn btn-success" : "btn btn-dark"}>{manche.score_jeux_joueur_1}</button>
                                    )
                                })}
                            </MDBCol>
                        </MDBContainer>
                    </MDBRow>
                    <MDBRow>
                        <MDBContainer className='d-flex align-items-center'>
                            <MDBCol className={this.state.joueurGagnant === 2 ? "font-weight-bold" : ""}>
                                {this.state.nomJoueur2}
                            </MDBCol>
                            <MDBCol>
                                {this.state.listeManches.map(manche => {
                                    return (
                                        <button key={manche.id_manche} type="button"
                                                className={manche.score_jeux_joueur_2 === 6 ? "btn btn-success" : "btn btn-dark"}>{manche.score_jeux_joueur_2}</button>
                                    )
                                })}
                            </MDBCol>
                        </MDBContainer>
                    </MDBRow>
                </td>
            </tr>

        );
    }
}

export default PartieDansListe;