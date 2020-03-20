import React from 'react'
import PropTypes from 'prop-types'
import hljs from 'highlight.js/lib/highlight'
import json from 'highlight.js/lib/languages/json'

import styles from './styles.module.less'
import './highlighting.less'

hljs.registerLanguage('json', json)

const SocketMessage = ({ message }) => {
  return (
    <div
      className={styles.container}
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: hljs.highlight('json', message).value
      }}
    />
  )
}

SocketMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default SocketMessage
