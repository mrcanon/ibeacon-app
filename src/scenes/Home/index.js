import React from 'react'
import { Link } from 'react-router-dom'
import Overlay from '../../components/Overlay'
import { translate, Interpolate, Trans } from 'react-i18next'
import { connect } from 'react-redux'
import i18n from '../../services/language/i18n'
import { toggleMenu, logout } from '../../services/users/actions.js'
import classnames from 'classnames'

import srcLogo from '../../boilerplate/assets/img/logo.svg'
import srcGuide from '../../boilerplate/assets/img/icons/64x64/icon-guide.svg'
import srcHistory from '../../boilerplate/assets/img/icons/64x64/history.svg'
import srcLocation from '../../boilerplate/assets/img/icons/64x64/location.svg'
import srcLogin from '../../boilerplate/assets/img/icons/24x24/login.svg'
import srcAbout from '../../boilerplate/assets/img/icons/24x24/about.svg'
import srcSetting from '../../boilerplate/assets/img/icons/24x24/setting.svg'


@translate(['home'], { wait: true })

class Home extends React.Component {

    onLogout() {
        const { logout } = { ...this.props }
        logout()
    }

    render() {
        const { t, user, logout } = { ...this.props }

        return (
            <div id="wrapper" className="wrapper page-home">
                <div className="container">
                    <div className="home-logo">
                        <Link to="/">
                            <img src={srcLogo} width="128" height="128" alt={t('common:app_name')} />
                        </Link>
                    </div>
                    <div className="home-content">
                        <Link to="/guide" className="home-item">
                            <div className="home-media">
                                <img src={srcGuide} alt={t('common:auto_guide')} width="64" height="64" />
                            </div>
                            <div className="home-content">
                                <h2 className="home-heading">{t('common:auto_guide')}</h2>
                                <p className="home-summary">{t('auto_guide_desc')}</p>
                            </div>
                        </Link>
                        <Link to="/log" className="home-item">
                            <div className="home-content">
                                <h2 className="home-heading">{t('common:history')}</h2>
                                <p className="home-summary">{t('history_desc')}</p>
                            </div>
                            <div className="home-media"><img src={srcHistory} alt={t('common:history')} width="64" height="64" /></div>
                        </Link>
                        <Link to="/guide" className="home-item">
                            <div className="home-media"><img src={srcLocation} alt={t('common:indoor_location')} width="64" height="64" /></div>
                            <div className="home-content">
                                <h2 className="home-heading">{t('common:indoor_location')}</h2>
                                <p className="home-summary">{t('indoor_location_desc')}</p>
                            </div>
                        </Link>
                    </div>
                    <ul className="home-list">
                        <li>
                            {
                                (user.isAuthenticated) ?
                                    (
                                        <Link to="/" onClick={this.onLogout.bind(this)}>
                                            <img src={srcLogin} alt="" width="24" height="24" />
                                            <span>{t('common:logout')}</span>
                                        </Link>
                                    )
                                    :
                                    (
                                        <Link to="/login">
                                            <img src={srcLogin} alt="" width="24" height="24" />
                                            <span>{t('common:login')}</span>
                                        </Link>
                                    )
                            }

                        </li>
                        <li>
                            <Link to="/setting">
                                <img src={srcSetting} alt="" width="24" height="24" />
                                <span>{t('common:setting')} </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                <img src={srcAbout} alt="" width="24" height="24" />
                                <span>{t('common:about')}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
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
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)