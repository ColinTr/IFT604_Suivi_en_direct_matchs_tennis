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
                <td style={{padding: 0}} className="linkPartieDansListe">
                    <a href="/">
                        <MDBRow>
                            <MDBContainer className='listPartieRow'>
                                <MDBCol className={this.state.joueurGagnant === 1 ? "font-weight-bold" : ""}>
                                    {this.state.nomJoueur1}
                                </MDBCol>
                                <MDBCol className="listPartieRowItem">
                                    {this.state.listeManches.map(manche => {
                                        return (
                                            <button key={manche.id_manche} type="button"
                                                    className={manche.score_jeux_joueur_1 === 6 ? "btn btn-success unclickable" : "btn btn-dark unclickable"}>{manche.score_jeux_joueur_1}</button>
                                        )
                                    })}
                                </MDBCol>
                            </MDBContainer>
                        </MDBRow>
                        <MDBRow>
                            <MDBContainer className='listPartieRow'>
                                <MDBCol className={this.state.joueurGagnant === 2 ? "font-weight-bold" : ""}>
                                    {this.state.nomJoueur2}
                                </MDBCol>
                                <MDBCol className="listPartieRowItem">
                                    {this.state.listeManches.map(manche => {
                                        return (
                                            <button key={manche.id_manche} type="button"
                                                    className={manche.score_jeux_joueur_2 === 6 ? "btn btn-success unclickable" : "btn btn-dark unclickable"}>{manche.score_jeux_joueur_2}</button>
                                        )
                                    })}
                                </MDBCol>
                            </MDBContainer>
                        </MDBRow>
                    </a>
                </td>
            </tr>
        );
    }
}

export default PartieDansListe;