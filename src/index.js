import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from 'react-router-dom'
import TransitionGroup from "react-transition-group/TransitionGroup";

import { Provider } from 'react-redux'
import configStore from './store'

import { I18nextProvider } from 'react-i18next'
import i18n from './services/language/i18n'

import './boilerplate/assets/scss/style.scss'

import AnimatedSwitch from './components/AnimatedSwitch'
import Wellcome from './scenes/Wellcome'
import Home from './scenes/Home'
import Setting from './scenes/Setting'
import Log from './scenes/Log'
import About from './scenes/About'
import Guide from './scenes/Guide'
import Login from './scenes/Login'

const store = configStore()

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <Router>
                <Route
                    render={({ location }) => (
                        <TransitionGroup component="main">
                            <AnimatedSwitch key={location.key} location={location} >
                                <Route exact path="/" component={Home} />
                                <Route path="/wellcome" component={Wellcome} />
                                <Route path="/setting" component={Setting} />
                                <Route path="/about" component={About} />
                                <Route path="/guide" component={Guide} />
                                <Route path="/login" component={Login} />
                                <Route path="/log" component={Log} />
                            </AnimatedSwitch>
                        </TransitionGroup>
                    )}
                />
            </Router>
        </Provider>
    </I18nextProvider>
    , document.getElementById('root')
)
