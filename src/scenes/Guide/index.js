import React from 'react'
import Header from '../../components/Header'
import Overlay from '../../components/Overlay'
import Navigation from '../../components/Navigation'
import { connect } from 'react-redux'
import { toggleMenu, toggleLoading } from '../../services/users/actions.js'
import classnames from 'classnames'
import axios from 'axios'
import i18n from '../../services/language/i18n'
import { translate, Interpolate, Trans } from 'react-i18next'

import srcGuide from '../../boilerplate/assets/img/icons/64x64/icon-guide.svg'
import srcDm from '../../boilerplate/assets/img/icons/24x24/dm.svg'
import srcUserGroup from '../../boilerplate/assets/img/icons/24x24/user-group.svg'
import srcDecs from '../../boilerplate/assets/img/icons/24x24/description.svg'
import srcAchive from '../../boilerplate/assets/img/icons/24x24/achive.svg'
import srcHome from '../../boilerplate/assets/img/icons/24x24/home.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu.svg'

@translate(['guide'], { wait: true })

class Guide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataGuide: []
        }
    }

    componentWillMount() {
        const { toggleLoading, user } = { ...this.props }
        toggleLoading(user.isLoading)
    }

    componentDidMount() {
        axios.get('http://59bd2f925037eb00117b4b2c.mockapi.io/guide/1')
            .then((res) => {
                this.setState({
                    dataGuide: res.data
                })
            })
            .then(() => {
                const { toggleLoading, user } = { ...this.props }
                toggleLoading(user.isLoading)
            })
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        const { dataGuide } = { ...this.state }

        return (
            <div id="wrapper" className={classnames("wrapper page-bg-white", { 'is-show': user.isMenu, 'is-loading': user.isLoading })}>
                <Header srcHome={srcHome} srcMenu={srcMenu} toggleMenu={toggleMenu} />
                <div className="container">
                    <div className="guide-page section-page">
                        <div className="guide-logo"><img src={srcGuide} width="64" height="64" /></div>
                        <h2 className="guide-title">{t('common:guide')}</h2>
                        <p className="guide-desc">{t('guide:guide_decs')}</p>
                        <div className="guide-container">
                            <div className="guide-header">{dataGuide.location}</div>
                            <ul className="guide-content">
                                <li>
                                    <div className="info-icon"><img src={srcDm} alt="" width="24" height="24" /></div>
                                    <div className="info-content">
                                        <div className="info-title">{t('guide:dm')}</div>
                                        <div className="info-desc">{dataGuide.manager}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="info-icon"><img src={srcUserGroup} alt="" width="24" height="24" /></div>
                                    <div className="info-content">
                                        <div className="info-title">{t('guide:head_count')}</div>
                                        <div className="info-desc">{dataGuide.headcount}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="info-icon"><img src={srcDecs} alt="" width="24" height="24" /></div>
                                    <div className="info-content">
                                        <div className="info-title">{t('guide:description')}</div>
                                        <div className="info-desc">{dataGuide.description}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="info-icon"><img src={srcAchive} alt="" width="24" height="24" /></div>
                                    <div className="info-content">
                                        <div className="info-title">{t('guide:achievement')}</div>
                                        <div className="info-desc">{dataGuide.achievements}</div>
                                    </div>
                                </li>
                            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Guide)