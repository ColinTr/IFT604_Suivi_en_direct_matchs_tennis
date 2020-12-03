const express = require('express');
const router = express.Router();
const path = require('path');

/* Requete HTTP GET sur /data */
router.get('/', (req, res) => {
    const accept = req.headers.accept;
    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        // TODO
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        // TODO
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/horaire */
router.get('/horaire', (req, res) => {
    const accept = req.headers.accept;
    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        // TODO
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        // TODO
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/horaire/:id_partie */
router.get('/horaire/:id_partie', (req, res) => {
    const accept = req.headers.accept;
    const id_partie = req.params.id_partie;
    if(id_partie === null) {
        return res.status(400).send("id_partie manquant").end();
    }

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        // TODO
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        // TODO
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/joueur */
router.get('/joueur', (req, res) => {
    const accept = req.headers.accept;
    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        // TODO
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        // TODO
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/horaire/:id_joueur */
router.get('/joueur/:id_joueur', (req, res) => {
    const accept = req.headers.accept;
    const id_partie = req.params.id_partie;
    if(id_partie === null) {
        return res.status(400).send("id_joueur manquant").end();
    }

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        // TODO
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        // TODO
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/partie */
router.get('/partie', (req, res) => {
    const accept = req.headers.accept;
    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        // TODO
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        // TODO
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

/* Requete HTTP GET sur /data/partie/:id_partie */
router.get('/partie/:id_partie', (req, res) => {
    const accept = req.headers.accept;
    const id_partie = req.params.id_partie;
    if(id_partie === null) {
        return res.status(400).send("id_partie manquant").end();
    }

    if (accept === "text/html") {
        res.setHeader('Content-Type', 'text/html');
        // TODO
    } else if (accept === "application/rdf+xml") {
        res.setHeader('Content-Type', 'application/rdf+xml');
        // TODO
    } else {
        return res.status(400).send("Type non reconnu").end();
    }
});

module.exports = router;