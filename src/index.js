import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstarp'
import 'normalize.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'defaultStyles/defaultStyles.sass'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();