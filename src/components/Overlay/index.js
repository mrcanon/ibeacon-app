import React from 'react'
import PropTypes from 'prop-types'

class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()
    this.props.toggleMenu(this.props.isMenu)
  }

  render() {
    return (
      <div onClick={this.onClick} className="overlay"></div>
    )
  }
}

Overlay.propTypes = {
  isMenu: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
}

export default Overlay