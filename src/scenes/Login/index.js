import React from 'react'
import Header from '../../components/Header'
import Overlay from '../../components/Overlay'
import Navigation from '../../components/Navigation'
import { connect } from 'react-redux'
import { toggleMenu, toggleLoading, toggleLogin } from '../../services/users/actions.js'
import classnames from 'classnames'
import axios from 'axios'
import i18n from '../../services/language/i18n'
import { translate, Interpolate, Trans } from 'react-i18next'
import validateInput from '../../services/validate/validator'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import srcHome from '../../boilerplate/assets/img/icons/24x24/home.svg'
import srcMenu from '../../boilerplate/assets/img/icons/24x24/menu.svg'
import srcHistory from '../../boilerplate/assets/img/icons/64x64/history.svg'
import srcVerify from '../../boilerplate/assets/img/icons/24x24/verify.svg'
import srcLogin from '../../boilerplate/assets/img/icons/64x64/login.svg'
import srcUser from '../../boilerplate/assets/img/icons/24x24/user.svg'
import srcPass from '../../boilerplate/assets/img/icons/24x24/pass.svg'
import srcEyeOn from '../../boilerplate/assets/img/icons/24x24/eye-on.svg'
import srcEyeOff from '../../boilerplate/assets/img/icons/24x24/eye-off.svg'

@translate(['login'], { wait: true })

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            errors: {},
            code_verify: '',
            errorLogin: '',
            togglePass: false,
            toggleVerify: false,
            device_id: '123456654333455',
            checkVerify: false
        }
        this.onChangeInput = this.onChangeInput.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    toggleShowText(value) {
        if (value === "password") {
            this.setState({
                togglePass: !this.state.togglePass
            })
        } else {
            this.setState({
                toggleVerify: !this.state.toggleVerify
            })
        }

    }

    onChangeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isValid() {
        const { t } = { ...this.props }
        const { errors, isValid } = validateInput(this.state, t);

        if (!isValid) {
            this.setState({
                errors
            })
        }

        return isValid;
    }

    onCloseAlert(e) {
        e.preventDefault()
        if (!$("#alert-message").hasClass("hidden-alert")) {
            $("#alert-message").addClass("hidden-alert")
        }
    }

    onLogin(e) {
        e.preventDefault()
        const { toggleLogin, toggleLoading, user, t } = { ...this.props }

        if (this.isValid()) {
            const id = parseInt(this.state.user)
            toggleLoading(user.isLoading)
            let dataUser = {
                user_name: this.state.user,
                password: this.state.password,
                device_id: this.state.device_id,
                code_verify: this.state.code_verify
            }

            axios.post(`http://172.16.110.149:8082/api/auth/login`, dataUser)
                .then((res) => {
                    this.setState({
                        user: '',
                        password: '',
                        errors: {},
                        code_verify: '',
                        errorLogin: ''
                    })
                    toggleLoading(true)
                    toggleLogin(res.data.data)
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        this.setState({
                            errors: {},
                            errorLogin: t('login:error_login')
                        })
                        toggleLoading(true)
                        if ($("#alert-message").hasClass("hidden-alert")) {
                            $("#alert-message").removeClass("hidden-alert")
                        }
                    }
                    if (error.response.status == 401) {
                        this.setState({
                            checkVerify: true,
                            errors: {},
                            errorLogin: "Chưa xác nhận mã verify"
                        })
                        toggleLoading(true)
                        if ($("#alert-message").hasClass("hidden-alert")) {
                            $("#alert-message").removeClass("hidden-alert")
                        }
                    }
                })
        }
    }

    toggleShowVerify() {
        const { t } = { ...this.props }
        const { errors, password, togglePass, toggleVerify } = { ...this.state }

        if (this.state.checkVerify) {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="code-verify" className="form-label"><img src={srcVerify} alt="Verify icon" /></label>
                        <input id="verify" type={toggleVerify ? "text" : "password"} name="code_verify" placeholder={t('login:placeholder_code')} className="form-control" onChange={this.onChangeInput} />
                        <img src={toggleVerify ? srcEyeOff : srcEyeOn} alt="Eye icon" className="form-icon" onClick={() => this.toggleShowText("verify")} />
                        <span className="help-block"></span>
                    </div>
                    <p className="login-verify">{t('login:desc')}</p>
                </div>
            )
        } else {
            return ""
        }
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        const { errors, password, togglePass, toggleVerify } = { ...this.state }

        return (
            <div id="wrapper" className={classnames('wrapper page-bg-white', { 'is-show': user.isMenu, 'is-loading': user.isLoading })}>
                {
                    (user.isAuthenticated) ? <Redirect to={{ pathname: '/wellcome' }} /> : ""
                }
                <Header srcHome={srcHome} srcMenu={srcMenu} toggleMenu={toggleMenu} />
                <div className="container">
                    <div className="panel-login">
                        <h1 className="login-logo"><img src={srcLogin} alt="Login logo" width="64" height="64" /></h1>
                        <h2 className="login-heading">{t('common:login')}</h2>
                        <p className="login-summary">{t('login:login_desc')}</p>
                        <form action="">
                            <div className={classnames("form-group", { "has-error": errors.user })}>
                                <label htmlFor="user" className="form-label"><img src={srcUser} alt="User icon" /></label>
                                <input id="user" type="text" name="user" placeholder={t('login:placeholder_user')} value={this.state.user} className="form-control" onChange={this.onChangeInput} />
                                <span className="help-block">{errors.user}</span>
                            </div>
                            <div className={classnames("form-group", { "has-error": errors.password })}>
                                <label htmlFor="password" className="form-label"><img src={srcPass} alt="Password icon" /></label>
                                <input id="password" type={togglePass ? "text" : "password"} name="password" value={password} placeholder={t('login:placeholder_password')} className="form-control" onChange={this.onChangeInput} />
                                <img src={togglePass ? srcEyeOff : srcEyeOn} alt="Eye icon" className="form-icon" onClick={() => this.toggleShowText("password")} />
                                <span className="help-block">{errors.password}</span>
                            </div>
                            {this.toggleShowVerify()}
                            <button type="submit" className="btn btn-success" onClick={this.onLogin} >{t('common:login')}</button>
                        </form>
                    </div>
                </div>
                <div className="alert-message hidden-alert" id="alert-message">
                    <div className="alert-content">{this.state.errorLogin}</div>
                    <button onClick={this.onCloseAlert}>Close</button>
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
        },
        toggleLogin: (data) => {
            dispatch(toggleLogin(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)