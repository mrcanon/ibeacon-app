import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
class IconHome extends React.Component {
    render() {
        const { src } = { ...this.props }
        return (
            <Link to="/" className="header-home">
                <img src={src} alt="Icon Home" width="24" height="24" />
            </Link>
        )
    }
}

IconHome.propTypes = {
    src: PropTypes.string.isRequired
}

export default IconHome