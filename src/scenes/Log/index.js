import React from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Overlay from '../../components/Overlay'
import { translate, Interpolate, Trans } from 'react-i18next'
import { connect } from 'react-redux'
import i18n from '../../services/language/i18n'
import { toggleMenu, toggleLoading } from '../../services/users/actions.js'
import classnames from 'classnames'
import axios from 'axios'
import LogItem from './components/LogItem'
import LogHeader from './components/LogHeader'
import { Redirect, withRouter } from 'react-router-dom'

import 'slick-carousel';
import 'slick-carousel/slick/slick.css'

import srcHome from '../../boilerplate/assets/img/icons/24x24/home-white.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu-white.svg'
import srcHistory from '../../boilerplate/assets/img/icons/64x64/history.svg'

@translate(['log', 'home'], { wait: true })

class Log extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logTime: [],
            workDate: "",
            weekday: ""
        }
    }

    carousel() {
        const $carousel = $('#history-checkin')
        if ($carousel.length > 0) {
            $carousel.slick({
                dots: false,
                infinite: true,
                speed: 100,
                arrows: false,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                cssEase: 'ease-in'
            });
        }
    }

    componentWillMount() {
        const { toggleLoading, user } = { ...this.props }
        toggleLoading(user.isLoading)
    }

    componentDidMount() {
        const { user } = { ...this.props }

        let infoUser = {
            user_name: user.dataUser.user_name,
            token: user.tokenUser
        }
        axios.post("http://172.16.110.149:8082/api/history", infoUser)
            .then((res) => {
                this.setState({
                    logTime: res.data,
                })

                this.carousel()
            })
            .then(() => {
                const { toggleLoading, user } = { ...this.props }
                this.setState({
                    workDate: (this.state.logTime[0].work_date) ? this.state.logTime[0].work_date : ""
                })
                
                let d = new Date(this.state.workDate);
                let weekday = new Array(7);
                weekday[0] =  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                
                this.setState({
                    weekday: weekday[d.getDay()]
                })
                toggleLoading(user.isLoading)
            })
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        const { logTime, workDate, weekday } = { ...this.state }

        return (
            <div className={classnames('wrapper page-history', { 'is-show': user.isMenu, 'is-loading': user.isLoading })}>

                <Header toggleMenu={toggleMenu} isMenu={user.isMenu} srcHome={srcHome} srcMenu={srcMenu} />
                <div className="container">
                    <div className="history-page section-page">
                        <div className="history-logo"><img src={srcHistory} width="64" height="64" alt={t('common:history')} /></div>
                        <h2 className="history-title">{t('common:history')}</h2>
                        <p className="history-desc">{t('home:history_desc')}</p>
                        <div className="history-container">
                            <div className="history-checkin" id="history-checkin">
                                <div className="history-list">
                                    <LogHeader date="ToDay" time={workDate} />
                                    <ul className="history-content">
                                        {
                                            logTime.map((value) =>
                                                <LogItem time={value.checkout} location={value.department} key={value.checkout + Math.random()} />
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Overlay toggleMenu={toggleMenu} isMenu={user.isMenu} />
                <Navigation t={t} />
            </div>
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
        toggleMenu: status => {
            dispatch(toggleMenu(status))
        },
        toggleLoading: status => {
            dispatch(toggleLoading(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)