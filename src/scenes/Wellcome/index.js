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

import srcHome from '../../boilerplate/assets/img/icons/24x24/home-white.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu-white.svg'
import srcProfile from '../../boilerplate/assets/img/profile.jpg'
import srcStart from '../../boilerplate/assets/img/icons/64x64/star.svg'
import srcFb from '../../boilerplate/assets/img/fb-logo.svg'

@translate(['wellcome'], { wait: true })

class Wellcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTimeSheet: {}
        }
        this.renderInfo = this.renderInfo.bind(this)
    }

    componentWillMount() {
        const { toggleLoading, user } = { ...this.props }
        toggleLoading(user.isLoading)
    }

    componentDidMount() {
        const { toggleLoading, user } = { ...this.props }
        let dataUser = (localStorage.getItem("dataUser") === "{}") ? {} : JSON.parse(localStorage.getItem("dataUser"))
        let tokenUser = (localStorage.getItem("tokenUser") === "") ? '' : localStorage.getItem("tokenUser")

        toggleLoading(true)

        let dataTimeSheet = {
            user_name: dataUser.user_name,
            device_id: 1111,
            token: tokenUser
        }

        axios.post('http://172.16.110.149:8082/api/timesheet', dataTimeSheet)
            .then((res) => {
                this.setState({
                    dataTimeSheet: res.data
                })
            })
            .then(() => {
                if (!$("#wellcom-star").hasClass("zoomIn")) {
                    $("#wellcom-star").addClass("zoomIn")
                }
            })
    }

    renderInfo(status) {
        const { t, user } = { ...this.props }
        let dataUser = (localStorage.getItem("dataUser") === "{}") ? {} : JSON.parse(localStorage.getItem("dataUser"))

        if (status) {
            return (
                <li className="info-content">
                    <div className="info-title">{t('wellcome:people_before')}</div>
                    <div className="info-desc">{t('wellcome:people_first')}</div>
                </li>
            )
        } else {
            return (
                <li className="info-content">
                    <div className="info-title">{t('wellcome:people_before')}</div>
                    {<div className="info-desc">{dataUser.pLast}</div>}
                </li>
            )
        }
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        const { dataTimeSheet } = { ...this.state }
        let dataUser = (localStorage.getItem("dataUser") === "{}") ? {} : JSON.parse(localStorage.getItem("dataUser"))

        return (
            <div id="wrapper" className={classnames('wrapper page-wellcome', { 'is-show': user.isMenu, 'is-loading': user.isLoading })}>
                <Header toggleMenu={toggleMenu} isMenu={user.isMenu} srcHome={srcHome} srcMenu={srcMenu} />
                <div className="container">
                    <div className="wellcome-page">
                        <div className="wellcome-content">
                            <div className="wellcome-logo">
                                <img src={`http://172.16.110.149:8082/img/avatar/${dataUser.avatar}`} width="100" height="100" />
                                {
                                    (dataTimeSheet.count == 1) ? <div className="wellcom-star"><img src={srcStart} id="wellcom-star" /></div> : ""
                                }
                            </div>

                            <p className="wellcome-desc">{t('wellcome:wellcome_desc')}</p>
                            <h2 className="wellcome-title">{dataUser.fullname}</h2>
                            <div className="wellcome-container">
                                <ul className="wellcome-content">
                                    {this.renderInfo(dataUser.places === '1')}
                                    <li className="info-content">
                                        <div className="info-title">{t('wellcome:people_after')}</div>
                                        <div className="info-desc">{dataUser.pFirst}</div>
                                    </li>
                                    <li className="info-content">
                                        <div className="info-title">{t('wellcome:class_1')}</div>
                                        <div className="info-desc">{dataTimeSheet.count} </div>
                                        <div className="info-title">{t('wellcome:class_2')}</div>
                                    </li>
                                </ul>
                            </div>
                        </div><a className="wellcome-share"><img src={srcFb} width="18" height="18" /><span>{t('wellcome:share_fb')}</span></a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wellcome)