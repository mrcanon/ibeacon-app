import React from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Overlay from '../../components/Overlay'
import { translate, Interpolate, Trans } from 'react-i18next'
import { connect } from 'react-redux'
import i18n from '../../services/language/i18n'
import { toggleMenu, changeLng } from '../../services/users/actions.js'
import classnames from 'classnames'

import srcHome from '../../boilerplate/assets/img/icons/24x24/home.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu.svg'
import srcSetting from '../../boilerplate/assets/img/icons/64x64/setting.svg'

@translate(['setting'], { wait: true })

class Setting extends React.Component {
    constructor(props) {
        super(props)
    }

    changeLng(lng) {
        i18n.changeLanguage(lng)
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }

        return (
            <div className={classnames('wrapper page-setting', { 'is-show': user.isMenu })}>
                <Header toggleMenu={toggleMenu} isMenu={user.isMenu} srcHome={srcHome} srcMenu={srcMenu} />
                <div className="container">
                    <h1 className="setting-logo"><img src={srcSetting} alt="Setting logo" width="64" height="64" /></h1>
                    <h2 className="setting-heading">{t('common:setting')}</h2>
                    <div className="setting-language">
                        <h4 className="setting-title">{t('select_lng')}</h4>
                        <div className="setting-radio">
                            <div className="form-group">
                                <div className={classnames('radio-label', { 'radio-checked': i18n.language === 'en' })} onClick={() => { this.changeLng('en') }}>
                                    <span className="radio-outline">
                                        <span className="radio-tick"></span>
                                    </span>
                                    <span className="radio-text">{t('english')}</span>
                                </div>
                                <div className={classnames('radio-label', { 'radio-checked': i18n.language === 'ja' })} onClick={() => { this.changeLng('ja') }}>
                                    <span className="radio-outline">
                                        <span className="radio-tick"></span>
                                    </span>
                                    <span className="radio-text">{t('japan')}</span>
                                </div>
                                <div className={classnames('radio-label', { 'radio-checked': i18n.language === 'vi' })} onClick={() => { this.changeLng('vi') }}>
                                    <span className="radio-outline">
                                        <span className="radio-tick"></span>
                                    </span>
                                    <span className="radio-text">{t('vietnamese')}</span>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)