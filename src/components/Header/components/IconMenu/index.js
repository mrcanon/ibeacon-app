import React from 'react'
import PropTypes from 'prop-types'

class IconMenu extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        e.preventDefault()
        this.props.toggleMenu(this.props.isMenu)
    }

    render() {
        const { src } = { ...this.props }
        return (
            <a href="#" onClick={this.onClick} className="header-menu">
                <img src={src} alt="Icon Menu" width="24" height="24" />
            </a>
        )
    }
}

IconMenu.propTypes = {
    src: PropTypes.string.isRequired
}

export default IconMenu