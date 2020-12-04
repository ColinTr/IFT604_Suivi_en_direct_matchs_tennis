const express = require('express');
const router = express.Router();
const path = require('path');
const database = require('../utils/database');
const DataPageBuilder = require('../utils/rdfUtils/DataPageBuilder');
const HoraireBuilder = require('../utils/rdfUtils/HoraireBuilder');
const JoueurBuilder = require('../utils/rdfUtils/JoueurBuilder');
const PartieBuilder = require('../utils/rdfUtils/PartieBuilder');

/* Requete HTTP GET sur /data */
router.get('/', (req, res) => {
    const accept = req.headers.accept;

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname + '/../html/data.html'));
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        DataPageBuilder.createPageData()
            .then(pageData => {
                return res.send(pageData).end;
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/horaire */
router.get('/horaire', (req, res) => {
    const accept = req.headers.accept;

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        database.recupererToutesLesParties()
            .then(listeParties => {
                res.render('listeHoraires', {listeParties: listeParties});
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        HoraireBuilder.createListeHoraires()
            .then(pageHoraire => {
                return res.send(pageHoraire).end;
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/horaire/:id_partie */
router.get('/horaire/:id_partie', (req, res) => {
    const accept = req.headers.accept;
    const id_partie = req.params.id_partie;

    if (id_partie === null) {
        return res.status(400).send("id_partie manquant").end();
    }

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        database.recupererPartieViaId(id_partie)
            .then(partie => {
                if(partie !== undefined) {
                    return res.render('horaire', {partie: partie});
                } else {
                    return res.status(400).send("Aucune partie avec l'id spécifié").end();
                }
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else if (accept === "application/rdf+xml") {
        console.log("here");
        res.setHeader('Content-Type', 'application/rdf+xml');
        HoraireBuilder.createPageHoraire(id_partie)
            .then(pageHoraire => {
                return res.send(pageHoraire).end;
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/joueur */
router.get('/joueur', (req, res) => {
    const accept = req.headers.accept;

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        database.recupererTousLesJoueurs()
            .then(listeJoueurs => {
                database.recupererToutesLesParties()
                    .then(listeParties => {
                        return res.render('listeJoueurs', {listeJoueurs: listeJoueurs, listeParties: listeParties});
                    })
                    .catch(errMsg => {
                        console.log(errMsg);
                        return res.status(400).send(errMsg).end;
                    });
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        JoueurBuilder.createListeJoueurs()
            .then(pageHoraire => {
                return res.send(pageHoraire).end;
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/horaire/:id_joueur */
router.get('/joueur/:id_joueur', (req, res) => {
    const accept = req.headers.accept;
    const id_joueur = req.params.id_joueur;

    if (id_joueur === null) {
        return res.status(400).send("id_joueur manquant").end();
    }

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        database.trouverJoueurViaIdJoueur(id_joueur)
            .then(joueur => {
                if(joueur !== undefined) {
                    database.recupererToutesLesPartiesDuJoueur(joueur.id_joueur)
                        .then(listeParties => {
                            return res.render('joueur', {joueur: joueur, listeParties: listeParties});
                        })
                        .catch(errMsg => {
                            console.log(errMsg);
                            return res.status(400).send(errMsg).end;
                        });
                } else {
                    return res.status(400).send("Aucun joueur avec l'id spécifié").end();
                }
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        JoueurBuilder.createPageJoueur(id_joueur)
            .then(pageJoueur => {
                return res.send(pageJoueur).end;
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/partie */
router.get('/partie', (req, res) => {
    const accept = req.headers.accept;

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        database.recupererToutesLesParties()
            .then((listeParties) => {
                return res.render('listeParties', {listeParties: listeParties});
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        PartieBuilder.createListeParties()
            .then(listeParties => {
                return res.send(listeParties).end;
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/partie/:id_partie */
router.get('/partie/:id_partie', (req, res) => {
    const accept = req.headers.accept;
    const id_partie = req.params.id_partie;

    if (id_partie === null) {
        return res.status(400).send("id_partie manquant").end();
    }

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        database.recupererPartieViaId(id_partie)
            .then(partie => {
                if(partie !== undefined) {
                    return res.render('partie', {partie: partie});
                } else {
                    return res.status(400).send("Aucune partie avec l'id spécifié").end();
                }
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        PartieBuilder.createPagePartie(id_partie)
            .then(pagePartie => {
                return res.send(pagePartie).end;
            })
            .catch(errMsg => {
                console.log(errMsg);
                return res.status(400).send(errMsg).end;
            });
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

module.exports = router;