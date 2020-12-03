const express = require('express');
const router = express.Router();
const path = require('path');

/* Requete HTTP GET sur /data */
router.get('/', (req, res)=>{
	const accept = req.headers['accept'];

	if(accept === "text/html")
	{
		res.setHeader('Content-Type', 'text/html');
		res.sendFile(path.join(__dirname+'/../html/data.html'));
	}else if (accept == "application/rdf+xml"){
		console.log("RDF")
	}
	else {
		//TODO
		console.log("Aucun connu")
	}
	//res.render('data', { title: 'Hey', message: 'Hello there!'});
});

module.exports = router;