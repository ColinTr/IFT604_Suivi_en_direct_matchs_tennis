import React, {Component} from "react";

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
            <a href="#!" className="list-group-item list-group-item-action flex-column align-items-start">
                <table>
                    <tbody>
                    <tr>
                        <td className="alnleft">
                            <p className={this.state.joueurGagnant === 1 ? "font-weight-bold" : ""}>{this.state.nomJoueur1}</p>
                        </td>
                        <td className="alnright">
                            {this.state.listeManches.map(manche => {
                                return(
                                    <button key={manche.id_manche} type="button" className={manche.score_jeux_joueur_1===6?"btn btn-success":"btn btn-dark"}>{manche.score_jeux_joueur_1}</button>
                                )
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td className="alnleft">
                            <p className={this.state.joueurGagnant === 2 ? "font-weight-bold" : ""}>{this.state.nomJoueur2}</p>
                        </td>
                        <td className="alnright">
                            {this.state.listeManches.map(manche => {
                                return(
                                    <button key={manche.id_manche} type="button" className={manche.score_jeux_joueur_2===6?"btn btn-success":"btn btn-dark"}>{manche.score_jeux_joueur_2}</button>
                                )
                            })}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </a>
        );
    }
}

export default PartieDansListe;