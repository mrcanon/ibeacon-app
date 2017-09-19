import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Wellcome from '../Wellcome'
import Home from '../Home'
import Setting from '../Setting'
import Log from '../Log'
import About from '../About'
import Guide from '../Guide'
import Login from '../Login'
import PrivateRoute from '../../components/PrivateRoute'

class App extends Component {
    render() {
        const { user } = { ...this.props }

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/setting" component={Setting} />
                    <Route path="/about" component={About} />
                    <Route path="/guide" component={Guide} />
                    <Route path="/login" component={Login} />
                    <Route path="/wellcome" component={Wellcome} />
                    {/* <PrivateRoute authed={user.isAuthenticated} path='/wellcome' component={Wellcome} /> */}
                    <PrivateRoute authed={user.isAuthenticated} path='/log' component={Log} />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App)