import React, {Component} from 'react';
import PartieDansListe from './PartieDansListe'
import axios from 'axios'
import {MDBContainer, MDBTable, MDBTableBody, MDBBtn, MDBIcon} from "mdbreact";
import * as Swal from "sweetalert2";

class ListeParties extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor(props) {
        super(props);
        this.state = {
            listePartiesData: []
        };
    }

    intervalID = 0;

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount() {
        if (!navigator.onLine) {
            this.setState({listePartiesData: JSON.parse(localStorage.getItem('listePartiesData'))});
        }

        this.updateListeParties();

        this.updateListeParties = this.updateListeParties.bind(this);

        this.intervalID = setInterval(() => {
            this.updateListeParties();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updateListeParties() {
        if (navigator.onLine) {
            axios.get('http://localhost:3000/parties')
                .then(response => {
                    if( response.status === 200 ) {
                        this.setState({listePartiesData: []});
                        this.setState({listePartiesData: response.data});
                        localStorage.setItem('listePartiesData', JSON.stringify(response.data));
                    } else if ( response.status === 400 ) {
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
                    Swal.fire({
                        title: 'Erreur!',
                        text: error,
                        icon: 'error',
                        confirmButtonText: 'Cancel'
                    })
                });
        }
    }

    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        return (
            <MDBContainer>
                <MDBBtn className="rotate" outline style={{"borderRadius":"50%", "width":"50px", "height":"50px"}} onClick={this.updateListeParties}><MDBIcon icon="sync-alt" /></MDBBtn>
                <MDBContainer>
                    <MDBTable className="sticky-top listParties">
                        <MDBTableBody>
                            {this.state.listePartiesData.map(function (partieData, index) {
                                    return <PartieDansListe key={partieData.id_partie} data={partieData}/>
                                }
                            )}
                        </MDBTableBody>
                    </MDBTable>
                </MDBContainer>
            </MDBContainer>
        );
    }
}

export default ListeParties;