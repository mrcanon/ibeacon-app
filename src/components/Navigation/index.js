import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MenuLInk from './components/MenuLink'
import srcSetting from '../../boilerplate/assets/img/icons/24x24/setting.svg'
import srcGroup from '../../boilerplate/assets/img/icons/24x24/user-group2.svg'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { hideMenu } from '../../services/users/actions.js'

@translate(['nav'], { wait: true })

class Navigation extends React.Component {

    render() {
        const { t, user, hideMenu } = { ...this.props }
        return (
            <div className="splitter">
                <Link to="/wellcome" onClick={hideMenu}>
                    <div className="splitter-profile">
                        <div className="splitter-media">
                            <img src={user.dataUser.imageUrl} width="100" height="100" />
                        </div>
                        <div className="splitter-name">{user.dataUser.fullName}</div>
                    </div>
                </Link>
                <ul className="splitter-menu">
                    <MenuLInk to="setting" src={srcSetting} label={t('common:setting')} />
                    <MenuLInk to="about" src={srcGroup} label={t('common:about')} />
                </ul>
            </div>
        )
    }
}

Navigation.propTypes = {
    t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        hideMenu: () => {
            dispatch(hideMenu())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)