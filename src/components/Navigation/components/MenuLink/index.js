import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { hideMenu } from '../../../../services/users/actions.js'
class MenuLInk extends React.Component {
    render() {
        const { to, src, label, user, hideMenu } = { ...this.props }
        return (
            <li>
                <Link to={to} onClick={hideMenu}>
                    <img src={src} alt={label} width="24" height="24" /> {label}
                </Link>
            </li>
        )
    }
}

MenuLInk.propTypes = {
    to: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuLInk)