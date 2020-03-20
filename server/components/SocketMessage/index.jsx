import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.less'

const SocketMessage = ({ message }) => (
  <div className={styles.container}>{message}</div>
)

SocketMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default SocketMessage
