import React, {Component} from "react";
import {MDBRow, MDBCol, MDBContainer} from "mdbreact";

class PartieDansListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomJoueur1: props.data.joueur1.prenom + " " + props.data.joueur1.nom + " (" + props.data.joueur1.rang + ")",
            nomJoueur2: props.data.joueur2.prenom + " " + props.data.joueur2.nom + " (" + props.data.joueur2.rang + ")",
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
                    <a href={'/parties/'+this.props.data.id_partie }>
                        <MDBRow>
                            <MDBContainer className='listPartieRow'>
                                <MDBCol className={this.state.joueurGagnant === 1 ? "listPartieRowItemNomJoueur font-weight-bold" : "listPartieRowItemNomJoueur"}>
                                    {this.state.nomJoueur1}
                                </MDBCol>
                                <MDBCol className="listPartieRowItemScore">
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
                                <MDBCol className={this.state.joueurGagnant === 2 ? "listPartieRowItemNomJoueur font-weight-bold" : "listPartieRowItemNomJoueur"}>
                                    {this.state.nomJoueur2}
                                </MDBCol>
                                <MDBCol className="listPartieRowItemScore">
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
                    <a href={'/parties/'+this.props.data.id_partie }>
                        <MDBRow>
                            <MDBContainer className='d-flex align-items-center'>
                                <MDBCol className={this.state.joueurGagnant === 1 ? "nomJoueurMatchNonCommence font-weight-bold" : "nomJoueurMatchNonCommence"}>
                                    <span className="nomJoueur1MatchNonCommence">{this.state.nomJoueur1}</span>
                                    <span className="nomJoueur2MatchNonCommence">{this.state.nomJoueur2}</span>
                                </MDBCol>
                                <MDBCol className='heureMatchNonCommence font-weight-bold'>
                                    {this.state.datetime_debut_partie.split(" ")[1].substring(0,5)}
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
