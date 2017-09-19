import React from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Overlay from '../../components/Overlay'
import { translate, Interpolate, Trans } from 'react-i18next'
import { connect } from 'react-redux'
import i18n from '../../services/language/i18n'
import { toggleMenu, toggleLoading } from '../../services/users/actions.js'
import classnames from 'classnames'

import srcHome from '../../boilerplate/assets/img/icons/24x24/home-white.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu-white.svg'
import srcProfile from '../../boilerplate/assets/img/profile.jpg'
import srcStart from '../../boilerplate/assets/img/icons/64x64/star.svg'
import srcFb from '../../boilerplate/assets/img/fb-logo.svg'

@translate(['wellcome'], { wait: true })

class Wellcome extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
        const { toggleLoading, user } = { ...this.props }
        // toggleLoading(user.isLoading)
    }

    componentDidMount() {
        const { toggleLoading, user } = { ...this.props }
        toggleLoading(user.isLoading)
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        let dataUser = user.dataUser;

        return (
            <div id="wrapper" className={classnames('wrapper page-wellcome', { 'is-show': user.isMenu, 'is-loading': user.isLoading })}>
                <Header toggleMenu={toggleMenu} isMenu={user.isMenu} srcHome={srcHome} srcMenu={srcMenu} />
                <div className="container">
                    <div className="wellcome-page">
                        <div className="wellcome-content">
                            <div className="wellcome-logo"><img src={dataUser.imageUrl} width="100" height="100" /></div>
                            <div className="wellcom-star"><img src={srcStart} /></div>
                            <p className="wellcome-desc">Chào ngày mới!</p>
                            <h2 className="wellcome-title">{dataUser.fullName}</h2>
                            <div className="wellcome-container">
                                <ul className="wellcome-content">
                                    <li className="info-content">
                                        <div className="info-title">Người đến công ty trước bạn</div>
                                        <div className="info-desc">{dataUser.pLast}</div>
                                    </li>
                                    <li className="info-content">
                                        <div className="info-title">Người đến công ty sau bạn</div>
                                        <div className="info-desc">{dataUser.pFirst}</div>
                                    </li>
                                    <li className="info-content">
                                        <div className="info-title">Hôm nay bạn là người thứ</div>
                                        <div className="info-desc">{dataUser.places} </div>
                                        <div className="info-title">đến công ty</div>
                                    </li>
                                </ul>
                            </div>
                        </div><a className="wellcome-share"><img src={srcFb} width="18" height="18" /><span>SHARE NOW</span></a>
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