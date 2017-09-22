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

import apiLoginPath from "../../services/api/api-login.json"

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
			togglePassword: false,
			toggleVerify: false,
			device_id: '12345665433345500',
			checkVerify: false,
		}
		this.onChangeInput = this.onChangeInput.bind(this)
		this.onLogin = this.onLogin.bind(this)
	}

	getDeviceId() {
		// return new device_id on new device then install app iBeacon
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

	toggleShowText(e) {
		if (e === "password") {
			this.setState({ togglePassword: !this.state.togglePassword })
		} else {
			this.setState({ toggleVerify: !this.state.toggleVerify })
		}
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

			const data_user = {
				user_name: this.state.user,
				password: this.state.password,
				device_id: this.state.device_id,
				verify_code: this.state.code_verify
			}
			toggleLoading(user.isLoading)

			let apiLogin = apiLoginPath.linkApi
			axios.post(apiLogin, data_user)
				.then((res) => {
					this.setState({
						user: '',
						password: '',
						errors: {},
						code_verify: '',
						checkVerify: true
					})
					isAuthenticated: true
					
					toggleLoading(user.isLoading)
					toggleLogin(res.data.data, res.data.token)
				})
				.catch((error) => {
					if (error.response.status == 422) {
						toggleLoading(true)
						if ($("#alert-message").hasClass("hidden-alert")) {
							$("#alert-message").removeClass("hidden-alert")
						}
						$(".help-error").removeClass("help-block")	
					}
					if (error.response.status == 401) {
						this.setState({
							checkVerify: true,
						})
						toggleLoading(true)
						if ($("#alert-message").hasClass("hidden-alert")) {
							$("#alert-message").removeClass("hidden-alert")
						}
					}
				})
		}
	}

	toggleDeviceId() {
		const { t, toggleMenu, user } = { ...this.props }
		const { errors, password, togglePassword, toggleVerify } = { ...this.state }

		if (this.state.checkVerify) {
			return (
				<div className={classnames("form-group", "form-group-verify", { "has-error": errors.code_verify })}>
					<label htmlFor="code-verify" className="form-label"><img src={srcVerify} alt="Verify icon" /></label>
					<input id="verify" type={toggleVerify ? "text" : "password"} name="code_verify" placeholder={t('login:placeholder_code')} className="form-control" onChange={this.onChangeInput} />
					<img src={toggleVerify ? srcEyeOff : srcEyeOn} className="form-icon" id='eye-verify' onClick={() => this.toggleShowText("verify")} />
					<span className="help-block">{errors.code_verify}</span>
					<p className="login-verify">{t('login:desc')}</p>
				</div>
			)
		} else {
			return ''
		}
	}

	render() {
		const { t, toggleMenu, user } = { ...this.props }
		const { errors, password, togglePassword, toggleVerify, checkVerify } = { ...this.state }

		return (
			<div id="wrapper" className={classnames('wrapper page-bg-white', { 'is-show': user.isMenu, 'is-loading': user.isLoading })}>
				{
					(user.isAuthenticated) ? <Redirect to={{ pathname: '/wellcome' }} /> : ''
				}
				<Header srcHome={srcHome} srcMenu={srcMenu} toggleMenu={toggleMenu} />
				<div className="container">
					<div className="panel-login">
						<h1 className="login-logo"><img src={srcLogin} alt="Login logo" width="64" height="64" /></h1>
						<h2 className="login-heading">{t('common:login')}</h2>
						<p className="login-summary">{t('login:login_desc')}</p>
						<form action=''>
							<div className={classnames("form-group", { "has-error": errors.user })}>
								<label htmlFor="user" className="form-label"><img src={srcUser} alt="User icon" /></label>
								<input id="user" type="text" name="user" placeholder={t('login:placeholder_user')} value={this.state.user} className="form-control" onChange={this.onChangeInput} disabled={(checkVerify) ? true : false} />
								<span className="help-block help-error" >{errors.user}</span>
							</div>
							<div className={classnames("form-group", { "has-error": errors.password })}>
								<label htmlFor="password" className="form-label"><img src={srcPass} alt="Password icon" /></label>
								<input id="password" type={togglePassword ? "text" : "password"} name="password" value={password} placeholder={t('login:placeholder_password')} className="form-control" onChange={this.onChangeInput} disabled={(checkVerify) ? true : false} />
								<img src={togglePassword ? srcEyeOff : srcEyeOn} className="form-icon" id='eye-password' onClick={() => this.toggleShowText("password")} />
								<span className="help-block help-error" >{errors.password}</span>
							</div>

							{this.toggleDeviceId()}

							<button type="submit" className="btn btn-success" onClick={this.onLogin} >{t('common:login')}</button>
							<div className="alert-message hidden-alert" id="alert-message">
								{
									(checkVerify)
										? <div className="alert-content">{t('login:error_verify')}</div>
										: <div className="alert-content">{t('login:error_login')}</div>
								}
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
		toggleLogin: (data, token) => {
			dispatch(toggleLogin(data, token))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)