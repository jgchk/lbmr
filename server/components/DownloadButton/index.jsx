import React from 'react'
import PropTypes from 'prop-types'

import downloadIcon from '../../images/download.png'
import styles from './styles.module.less'

const DownloadButton = ({ url }) => {
  return (
    <a href={url} download='data.json' className={styles.button}>
      <img src={downloadIcon} alt='download' className={styles.icon} />
    </a>
  )
}

DownloadButton.propTypes = {
  url: PropTypes.string.isRequired
}

export default DownloadButton
