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
import { Redirect } from 'react-router-dom'

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
            logTime: []
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
        axios.get("http://59bd2f925037eb00117b4b2c.mockapi.io/log")
            .then((res) => {
                this.setState({
                    logTime: res.data
                })

                this.carousel()
            })
            .then(() => {
                const { toggleLoading, user } = { ...this.props }
                toggleLoading(user.isLoading)
            })
    }

    render() {
        const { t, toggleMenu, user, location } = { ...this.props }
        const { logTime } = { ...this.state }
        if (user.isAuthenticated) {
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
                                    {
                                        logTime.map((val) =>
                                            <div className="history-list" key={val.id}>
                                                <LogHeader date={val.day} time={val.date} />
                                                <ul className="history-content">
                                                    {
                                                        val.logTime.map((value) =>
                                                            <LogItem time={value.time} location={value.location} key={val.id + value.time} />
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Overlay toggleMenu={toggleMenu} isMenu={user.isMenu} />
                    <Navigation t={t} />
                </div>
            )
        } else {
            return (
                <Redirect to='/login' from={location} />
            )
        }

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