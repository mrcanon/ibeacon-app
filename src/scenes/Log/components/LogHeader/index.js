import React from 'react'
import PropTypes from 'prop-types'

class LogHeader extends React.Component {
  render() {
    const { date, time } = { ...this.props }
    return (
      <div className="history-header">
        <div className="history-day">{date}</div>
        <div className="history-date">{time}</div>
      </div>
    )
  }
}

LogHeader.propTypespropTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
}

export default LogHeader