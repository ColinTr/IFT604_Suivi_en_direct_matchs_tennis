import React, {Component} from "react";
import {MDBRow, MDBCol, MDBContainer} from "mdbreact";

class PartieDansListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomJoueur1: props.data.joueur1.prenom + " " + props.data.joueur1.nom,
            nomJoueur2: props.data.joueur2.prenom + " " + props.data.joueur2.nom,
            joueurGagnant: props.data.joueur_gagnant,
            listeManches: props.data.liste_manches,
            etat_partie: props.data.etat_partie,
            datetime_debut_partie: props.data.datetime_debut_partie,
            datetime_fin_partie: props.data.datetime_fin_partie
        };
    }

    render() {
        return (this.state.etat_partie === 1 || this.state.datetime_fin_partie !== null) ? (
            <tr>
                <td style={{padding: 0}} className="linkPartieDansListe">
                    <a href="/" className="lienVersPartie">
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
        )
        : (
            <tr>
                <td style={{padding: 0}} className="linkPartieDansListe">
                    <a href="/" className="lienVersPartie">
                        <MDBRow>
                            <MDBContainer className='d-flex align-items-center'>
                                <MDBCol className={this.state.joueurGagnant === 1 ? "font-weight-bold" : ""}>
                                    {this.state.nomJoueur1}
                                </MDBCol>
                                <MDBCol className='font-weight-bold'>
                                    {this.state.datetime_debut_partie.split(" ")[1]}
                                </MDBCol>
                            </MDBContainer>
                        </MDBRow>
                        <MDBRow>
                            <MDBContainer className='d-flex align-items-center'>
                                <MDBCol className={this.state.joueurGagnant === 2 ? "font-weight-bold" : ""}>
                                    {this.state.nomJoueur2}
                                </MDBCol>
                            </MDBContainer>
                        </MDBRow>
                    </a>
                </td>
            </tr>
        )
    }
}

export default PartieDansListe;
