import React from 'react'
import PropTypes from 'prop-types'
import IconHome from './components/IconHome'
import IconMenu from './components/IconMenu'
import { connect } from 'react-redux'

class Header extends React.Component {
    render() {
        const { srcHome, srcMenu, toggleMenu } = { ...this.props }
        return (
            <header className="header">
                <div className="container">
                    <IconHome src={srcHome} />
                    <IconMenu toggleMenu={toggleMenu} src={srcMenu} />
                </div>
            </header>
        )
    }
}

Header.propTypes = {
    srcHome: PropTypes.string.isRequired,
    srcMenu: PropTypes.string.isRequired,
    toggleMenu: PropTypes.func.isRequired
}

export default Header