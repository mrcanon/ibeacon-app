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
            errorLogin: ''
        }
        this.onChangeInput = this.onChangeInput.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    toggleShowText(value) {
        if ($(`#${value}`).attr('type') === 'text') {
            $(`#${value}`).attr('type', 'password');
        } else {
            $(`#${value}`).attr('type', 'text');
        }
    }

    onChangeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({
                errors
            })
        }

        return isValid;
    }

    onLogin(e) {
        e.preventDefault()
        const { toggleLogin, toggleLoading, user } = { ...this.props }

        if (this.isValid()) {
            const id = parseInt(this.state.user)
            toggleLoading(user.isLoading)

            axios.get(`http://59bd2f925037eb00117b4b2c.mockapi.io/login/${id}`)
                .then((res) => {
                    this.setState({
                        user: '',
                        password: '',
                        errors: {},
                        code_verify: '',
                        errorLogi: ''
                    })
                    return res
                })
                .then((res)=>{
                    toggleLoading(user.isLoading)
                    toggleLogin(res.data)
                })
                .catch((error) => {
                    if (error.response.status == 404) {
                        this.setState({
                            errors: {},
                            errorLogin: "User hoặc password không đúng"
                        })
                        toggleLoading(true)
                        alert(this.state.errorLogin)
                    }
                })
        }
    }

    render() {
        const { t, toggleMenu, user } = { ...this.props }
        const { errors, password } = { ...this.state }

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
                                <input id="password" type="password" name="password" value={password} placeholder={t('login:placeholder_password')} className="form-control" onChange={this.onChangeInput} />
                                <img src={srcEyeOn} alt="Eye icon" className="form-icon" onClick={() => this.toggleShowText("password")} />
                                <span className="help-block">{errors.password}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="code-verify" className="form-label"><img src={srcVerify} alt="Verify icon" /></label>
                                <input id="verify" type="password" name="code_verify" placeholder={t('login:placeholder_code')} className="form-control" onChange={this.onChangeInput} />
                                <img src={srcEyeOn} alt="Eye icon" className="form-icon" onClick={() => this.toggleShowText("verify")} />
                                <span className="help-block"></span>
                            </div>
                            <p className="login-verify">{t('login:desc')}</p>
                            <button type="submit" className="btn btn-success" onClick={this.onLogin} >{t('common:login')}</button>
                        </form>
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
        },
        toggleLogin: (data) => {
            dispatch(toggleLogin(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)