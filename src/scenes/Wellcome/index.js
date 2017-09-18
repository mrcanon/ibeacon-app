import React from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Overlay from '../../components/Overlay'
import { translate, Interpolate, Trans } from 'react-i18next'
import { connect } from 'react-redux'
import i18n from '../../services/language/i18n'
import { toggleMenu } from '../../services/users/actions.js'
import classnames from 'classnames'

import srcHome from '../../boilerplate/assets/img/icons/24x24/home.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu.svg'

@translate(['wellcome'], { wait: true })

class Wellcome extends React.Component {
    constructor(props) {
        super(props)
    }

    hideMenu() {
        this.props.toggleMenu(this.props.user.isMenu)
    }

    componentDidMount() {
        
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        return (
            <div className={classnames('wrapper', { 'is-show': user.isMenu })}>
                <Header toggleMenu={toggleMenu} isMenu={user.isMenu} srcHome={srcHome} srcMenu={srcMenu} />
                <h1>{t('common:appName')}</h1>
                <Overlay toggleMenu={toggleMenu} isMenu={user.isMenu} />
                <Navigation t={t}/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wellcome)