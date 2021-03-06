import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import configStore from './store'

import { I18nextProvider } from 'react-i18next'
import i18n from './services/language/i18n'

import './boilerplate/assets/scss/style.scss'

import PrivateRoute from './components/PrivateRoute'
import Wellcome from './scenes/Wellcome'
import Home from './scenes/Home'
import Setting from './scenes/Setting'
import Log from './scenes/Log'
import About from './scenes/About'
import Guide from './scenes/Guide'
import Login from './scenes/Login'
import App from './scenes/App'

const store = configStore()

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <App />
        </Provider>
    </I18nextProvider>
    , document.getElementById('root-app')
)
