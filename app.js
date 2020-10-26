/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const partiesRouter = require('./src/routes/partie');
const utilisateurRouter = require('./src/routes/utilisateur');
const parisRouter = require('./src/routes/pari');
const joueursRouter = require('./src/routes/joueur');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/parties', partiesRouter);
app.use('/utilisateurs', utilisateurRouter);
app.use('/joueurs', joueursRouter);
app.use('/paris', parisRouter);

const generateur = require('./src/generateur');
generateur.demarrer();

module.exports = app;
