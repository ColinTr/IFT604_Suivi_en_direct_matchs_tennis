import React, {Component} from 'react';
import PartieDansListe from './PartieDansListe'
import axios from 'axios'
import {MDBContainer, MDBTable, MDBTableBody} from "mdbreact";

class ListeParties extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor(props) {
        super(props);
        this.state = {
            listePartiesData: []
        };
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        if (!navigator.onLine) {
            this.setState({listePartiesData: localStorage.getItem('listePartiesData')});
        }

        this.updateListeParties();

        setInterval(() => {
            this.updateListeParties();
        }, 10000);
    }

    updateListeParties() {
        axios.get('http://localhost:3000/parties')
            .then(response => {
                this.setState({listePartiesData: response.data});
                localStorage.setItem('listePartiesData', response.data);
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            });
    }

    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        return (
            <MDBContainer style={{width: '30%'}} >
                <MDBTable className="sticky-top">
                    <MDBTableBody>
                        {this.state.listePartiesData.map(function (partieData, index) {
                                return <PartieDansListe key={partieData.id_partie} data={partieData}/>
                            }
                        )}
                    </MDBTableBody>
                </MDBTable>
            </MDBContainer>
        );
    }
}

export default ListeParties;