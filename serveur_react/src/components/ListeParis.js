import React, { Component } from 'react';
import axios from 'axios'
import ParisDansListe from './ParisDansListe';
import * as Swal from "sweetalert2";

class ListeParis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listeParisData : []
        };
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        if (!navigator.onLine) {
            this.setState({ listeParisData: localStorage.getItem('listeParisData') });
        }

        this.updateListeParis();

        setInterval(() => {
            this.updateListeParis();
        }, 10000);
    }

    updateListeParis(){
        //Faire avec l'id de l'utilisateur
        axios.get('http://localhost:3000/paris/utilisateur/' + localStorage.getItem('idUtilisateur'))
            .then(response => {
                this.setState({listeParisData: []});
                this.setState({ listeParisData: response.data });
                localStorage.setItem('listeParisData', response.data);
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

    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        return (
            <div className="pageParis">
                <h1 className="text-center titreParis">Liste de vos paris</h1>
                <div className="list-paris">
                    {this.state.listeParisData.map(function (parisData, index) {
                        if(parisData.joueur1 !== undefined && parisData.joueur2 !== undefined) {
                            return <ParisDansListe key={parisData.id_pari} data={parisData}/>
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default ListeParis;