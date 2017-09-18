import React from 'react'
import PropTypes from 'prop-types'

class LogItem extends React.Component {
  render() {
    const { time, location } = { ...this.props }
    return (
      <li>
        <div className="item-time">{time}</div>
        <div className="item-name">{location}</div>
      </li>
    )
  }
}

LogItem.propTypes = {
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}

export default LogItem