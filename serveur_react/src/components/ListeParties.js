import React, { Component } from 'react';
import PartieDansListe from './PartieDansListe'
import axios from 'axios'

class ListeParties extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor(props) {
        super(props);
        this.state = {
            listePartiesData : []
        };
    }
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        if (!navigator.onLine) {
            this.setState({ listePartiesData: localStorage.getItem('listePartiesData') });
        }
        setInterval(() => {
            console.log("componentDidMount called");
            axios.get('http://localhost:3000/parties')
                .then(response => {
                    this.setState({ listePartiesData: response.data });
                    localStorage.setItem('listePartiesData', response.data);
                })
                // Catch any error here
                .catch(error => {
                    console.log(error)
                });
        }, 10000);


    }
    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        console.log("render called");
        return (
            <div className="list-group">
                {this.state.listePartiesData.map(function (partieData, index) {
                        return <PartieDansListe key={partieData.id_partie} data={partieData}/>
                    }
                )}
            </div>
        );
    }
}

export default ListeParties;