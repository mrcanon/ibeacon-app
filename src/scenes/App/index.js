import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleMenu, logout, distanceIbeacon } from '../../services/users/actions.js'

import Wellcome from '../Wellcome'
import Home from '../Home'
import Setting from '../Setting'
import Log from '../Log'
import About from '../About'
import Guide from '../Guide'
import Login from '../Login'
import PrivateRoute from '../../components/PrivateRoute'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hits: null
        }
    }

    componentWillMount() {
        let { distanceIbeacon } = { ...this.props }
        // var app = {
        //     // Application Constructor
        //     initialize: function () {
        //         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        //     },

        //     onDeviceReady: function () {
        //         this.receivedEvent('deviceready');
        //     },

        //     // Update DOM on a Received Event
        //     receivedEvent: function (id) {

        //         var uuid = 'B0FC4601-14A6-43A1-ABCD-CB9CFDDB4013';
        //         var identifier = 'advertisedBeacon';


        //         var uuid = 'B0FC4601-14A6-43A1-ABCD-CB9CFDDB4013';
        //         var identifier = 'beaconOnTheMacBooksShelf';
        //         var minor = 25696;
        //         var major = 3;

        //         var logToDom = function (message) {
        //             var e = document.createElement('label');
        //             e.innerText = message;

        //             var br = document.createElement('br');
        //             var br2 = document.createElement('br');
        //             document.body.appendChild(e);
        //             document.body.appendChild(br);
        //             document.body.appendChild(br2);
        //         };

        //         var delegate = new cordova.plugins.locationManager.Delegate();

        //         delegate.didDetermineStateForRegion = function (pluginResult) {

        //             logToDom('Thucnv [DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

        //             cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
        //                 + JSON.stringify(pluginResult));
        //         };

        //         delegate.didStartMonitoringForRegion = function (pluginResult) {
        //             console.log('didStartMonitoringForRegion:', pluginResult);

        //             logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        //         };

        //         delegate.didRangeBeaconsInRegion = function (pluginResult) {
        //             let TxPower = pluginResult.beacons[0].tx
        //             let RSSI = pluginResult.beacons[0].rssi

        //             distanceIbeacon(pluginResult.beacons[0].accuracy)
        //         };

        //         var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        //         cordova.plugins.locationManager.setDelegate(delegate);

        //         // required in iOS 8+
        //         cordova.plugins.locationManager.requestWhenInUseAuthorization();
        //         // or cordova.plugins.locationManager.requestAlwaysAuthorization()

        //         cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        //             .fail(function (e) { console.error(e); })
        //             .done();
        //     }
        // };

        // app.initialize();
    }

    componentDidMount() {
        //--set value default localStorage
        if (!localStorage.getItem("isAuthenticated")) {
            localStorage.setItem("isAuthenticated", false);
        }

        if (!localStorage.getItem("dataUser")) {
            localStorage.setItem("dataUser", JSON.stringify({}));
        }

        if (!localStorage.getItem("tokenUser")) {
            localStorage.setItem("tokenUser", '');
        }
    }

    render() {
        const { user } = { ...this.props }
        let isAuthenticated = (localStorage.getItem("isAuthenticated") === "true") ? true : false

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/setting" component={Setting} />
                    <Route path="/about" component={About} />
                    <Route path="/guide" component={Guide} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute authed={isAuthenticated} path='/wellcome' component={Wellcome} />
                    <PrivateRoute authed={isAuthenticated} path='/log' component={Log} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        distanceIbeacon: (distance) => {
            dispatch(distanceIbeacon(distance))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)