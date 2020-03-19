import React from 'react'
import PropTypes from 'prop-types'

const SocketMessage = ({ message }) => <div>{message}</div>

SocketMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default SocketMessage
