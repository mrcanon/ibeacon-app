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
			togglePassword: true,
			toggleVerify: true
		}
		this.onChangeInput = this.onChangeInput.bind(this)
		this.onLogin = this.onLogin.bind(this)
	}

	onChangeInput(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	isValid() {
		const { t } = { ...this.props }
		const { errors, isValid } = validateInput(this.state, t)

		if (!isValid) {
			this.setState({ errors })
		}

		return isValid
	}

	toggleShowPassword(e) {
		(this.state.togglePassword === true) ? this.setState({ togglePassword: false }) : this.setState({ togglePassword: true })
	}

	toggleShowVerify(e) {
		(this.state.toggleVerify === true) ? this.setState({ toggleVerify: false }) : this.setState({ toggleVerify: true })
	}

	onCloseAlert(e) {
		e.preventDefault()
		if (!$("#alert-message").hasClass("hidden-alert")) {
			$("#alert-message").addClass("hidden-alert")
		}
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
					})
					isAuthenticated: true
					return res
				})
				.then((res) => {
					toggleLoading(user.isLoading)
					toggleLogin(res.data)
				})
				.catch((error) => {
					if (error.response.status == 404) {
						this.setState({
							errors: {},
						})
						toggleLoading(true)
						if ($("#alert-message").hasClass("hidden-alert")) {
							$("#alert-message").removeClass("hidden-alert")
						}
						removeClass("help-block")
					}
				})
		}
	}

	render() {
		const { t, toggleMenu, user } = { ...this.props }
		const { errors, password } = { ...this.state }
		const typePassword  = this.state.togglePassword ? 'password' : 'text'
		const eyePassword  = this.state.togglePassword ? srcEyeOn : srcEyeOff
		const typeVerify  = this.state.toggleVerify ? 'password' : 'text'
		const eyeVerify  = this.state.toggleVerify ? srcEyeOn : srcEyeOff

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
								<input id="password" type={ typePassword } name="password" value={password} placeholder={t('login:placeholder_password')} className="form-control" onChange={this.onChangeInput} />
								<img src={ eyePassword } className="form-icon" id='eye-password' onClick={() => this.toggleShowPassword()}/>
								<span className="help-block">{errors.password}</span>
							</div>
							<div className={classnames("form-group", { "has-error": errors.code_verify })}>
								<label htmlFor="code-verify" className="form-label"><img src={srcVerify} alt="Verify icon" /></label>
								<input id="verify" type={ typeVerify } name="code_verify" placeholder={t('login:placeholder_code')} className="form-control" onChange={this.onChangeInput} />
								<img src={ eyeVerify } className="form-icon" id='eye-verify' onClick={() => this.toggleShowVerify()} />
								<span className="help-block">{errors.code_verify}</span>
							</div>
							<p className="login-verify">{t('login:desc')}</p>
							<button type="submit" className="btn btn-success" onClick={this.onLogin} >{t('common:login')}</button>
							<div className="alert-message hidden-alert" id="alert-message">
								<div className="alert-content">{t('login:error_login')}</div>
								<button onClick={this.onCloseAlert}>{t('login:close_alert')}</button>
							</div>
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