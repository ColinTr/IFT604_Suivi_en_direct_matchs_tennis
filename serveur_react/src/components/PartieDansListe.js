import React, {Component} from "react";

class PartieDansListe extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            key: props.data.id_partie,
            nomJoueur1: props.data.joueur1.prenom + props.data.joueur1.nom,
            nomJoueur2: props.data.joueur2.prenom + props.data.joueur2.nom,
            joueurGagnant: 0,
            listeScoreManchesJoueur1: [],
            listeScoreManchesJoueur2: []
        };
    }

    render() {
        return (
            <a href="#!" className="list-group-item list-group-item-action flex-column align-items-start active">
                {this.state.key}<br/>
                {this.state.nomJoueur1}<br/>
                {this.state.nomJoueur2}<br/>
            </a>
        );
    }
}

export default PartieDansListe;