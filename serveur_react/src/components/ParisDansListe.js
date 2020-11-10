import React, {Component} from "react";
import { MDBTable, MDBTableBody } from 'mdbreact';

class ParisDansListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomJoueur1: props.data.joueur1.prenom + " " + props.data.joueur1.nom,
            nomJoueur2: props.data.joueur2.prenom + " " + props.data.joueur2.nom,
            joueurGagnant: props.data.joueur_gagnant,
            montantParie: props.data.montant_parie,
            montantGagne: props.data.montant_gagne,
            numJoueurParie: props.data.num_joueur_parie,
        };
    }

    render() {
        return (
            <div className="pariDiv">
                <MDBTable className="pariTable">
                    <MDBTableBody>
                        <tr className="joueursParis"><td className="bold">{this.state.nomJoueur1} vs {this.state.nomJoueur2}</td></tr>
                        <tr className="joueurGagnantParis"><td><span className="bold">Joueur Gagnant = </span>{this.state.joueurGagnant === 1 ?  this.state.nomJoueur1 : this.state.nomJoueur2}</td></tr>
                        <tr className="miseParis"><td><span className="bold">Mise = </span>{this.state.montantParie + ' €'}</td></tr>
                        <tr className="montantGagneParis"><td><span className="bold">Montant Gagne = </span><span style={{color: this.state.montantGagne > 0 ? "green" : "red"}}>{this.state.montantGagne + ' €'}</span></td></tr>
                        <tr className="joueurParieParis"><td><span className="bold">Joueur Parie = </span>{this.state.numJoueurParie === 1 ? this.state.nomJoueur1 : this.state.nomJoueur2}</td></tr>
                    </MDBTableBody>
                </MDBTable>
            </div>
        );
    }
}

export default ParisDansListe;