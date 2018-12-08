import * as serviceWorker from './serviceWorker'
import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstarp'
import 'firebaseConfig'
import 'normalize.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'defaultStyles/defaultStyles.sass'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();