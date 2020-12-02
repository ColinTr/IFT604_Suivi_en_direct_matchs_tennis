/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./src/routes');
const partiesRouter = require('./src/routes/parties');
const utilisateurRouter = require('./src/routes/utilisateurs');
const parisRouter = require('./src/routes/paris');
const joueursRouter = require('./src/routes/joueurs');
const dataRouter = require('./src/routes/data');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/parties', partiesRouter);
app.use('/utilisateurs', utilisateurRouter);
app.use('/joueurs', joueursRouter);
app.use('/paris', parisRouter);
app.use('/data', dataRouter);

const generateur = require('./src/utils/generateur');
generateur.demarrer();

app.set('views', './src/views');
app.set('view engine', 'pug');

module.exports = app;
