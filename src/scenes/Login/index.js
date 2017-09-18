import React from 'react'
import Header from '../../components/Header'
import Overlay from '../../components/Overlay'
import Navigation from '../../components/Navigation'
import { connect } from 'react-redux'
import { toggleMenu, toggleLoading } from '../../services/users/actions.js'
import classnames from 'classnames'
import 'slick-carousel';
import 'slick-carousel/slick/slick.css'
import axios from 'axios'
import i18n from '../../services/language/i18n'
import { translate, Interpolate, Trans } from 'react-i18next'

import srcHome from '../../boilerplate/assets/img/icons/24x24/home-white.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu-white.svg'
import srcHistory from '../../boilerplate/assets/img/icons/64x64/history.svg'


class Login extends React.Component {
    render() {
        const { t, toggleMenu, user } = { ...this.props }

        return (
            <div id="wrapper" className={classnames('wrapper page-history', { 'is-show': user.isMenu, 'is-loading': user.isLoading })}>
                <Header srcHome={srcHome} srcMenu={srcMenu} toggleMenu={toggleMenu} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)