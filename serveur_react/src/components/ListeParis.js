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

        this.intervalID = 0;
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        this.updateListeParis();

        this.intervalID = setInterval(() => {
            this.updateListeParis();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updateListeParis(){
        //Faire avec l'id de l'utilisateur
        axios.get('http://localhost:3000/paris/utilisateur/' + localStorage.getItem('idUtilisateur'))
            .then(response => {
                if( response.status === 200 ) {
                    this.setState({listeParisData: []});
                    this.setState({ listeParisData: response.data });
                    localStorage.setItem('listeParisData', JSON.stringify(response.data));
                } else if ( response.status === 400 ) {
                    // On récupère la liste des paris que l'on avait en localstorage
                    this.setState({ listeParisData: JSON.parse(localStorage.getItem('listeParisData'))});

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
                // On récupère la liste des paris que l'on avait en localstorage
                this.setState({ listeParisData: JSON.parse(localStorage.getItem('listeParisData'))});

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
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default ListeParis;