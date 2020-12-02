const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	const content_type = req.headers;
	console.log(content_type)
	const url = req.url
	console.log(url);
	res.render('data', { title: 'Hey', message: 'Hello there!'});
});

module.exports = router;