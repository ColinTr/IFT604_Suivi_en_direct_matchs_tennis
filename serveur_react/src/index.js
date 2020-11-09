import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'mdbreact/dist/css/mdb.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/global.css'

import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history'

const customHistory = createBrowserHistory();

ReactDOM.render(
    <Router history={customHistory}>
        <App/>
    </Router>,
    document.getElementById('root')
);

