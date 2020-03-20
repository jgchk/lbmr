import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.less'

const SocketMessenger = ({ onSend }) => {
  const [sensorType, setSensorType] = useState('gyro')
  const onSensorTypeChange = useCallback(e => setSensorType(e.target.value), [])

  const [x, setX] = useState(0)
  const onXChange = useCallback(e => setX(parseFloat(e.target.value)), [])

  const [y, setY] = useState(0)
  const onYChange = useCallback(e => setY(parseFloat(e.target.value)), [])

  const [z, setZ] = useState(0)
  const onZChange = useCallback(e => setZ(parseFloat(e.target.value)), [])

  const onSubmit = useCallback(
    e => {
      const measurement = {
        type: sensorType,
        data: { x, y, z },
        timestamp: Date.now()
      }
      onSend(measurement)
      e.preventDefault()
    },
    [onSend, sensorType, x, y, z]
  )

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <label htmlFor='sensor-type' className={styles.sensor}>
        Sensor
        <select
          id='sensor-type'
          className={styles.input}
          value={sensorType}
          onChange={onSensorTypeChange}
        >
          <option value='rotation'>Gyroscope</option>
          <option value='acceleration'>Accelerometer</option>
        </select>
      </label>

      <label htmlFor='sensor-data' className={styles.data}>
        Data
        <div id='sensor-data' className={styles.fields}>
          <label htmlFor='data-x' className={styles.field}>
            x
            <input
              id='data-x'
              className={styles.input}
              type='number'
              step='any'
              value={x}
              onChange={onXChange}
            />
          </label>
          <label htmlFor='data-y' className={styles.field}>
            y
            <input
              id='data-y'
              className={styles.input}
              type='number'
              step='any'
              value={y}
              onChange={onYChange}
            />
          </label>
          <label htmlFor='data-z' className={styles.field}>
            z
            <input
              id='data-z'
              className={styles.input}
              type='number'
              step='any'
              value={z}
              onChange={onZChange}
            />
          </label>
        </div>
      </label>

      <div className={styles.submit}>
        <input type='submit' value='Submit' className={styles.button} />
      </div>
    </form>
  )
}

SocketMessenger.propTypes = {
  onSend: PropTypes.func.isRequired
}

export default SocketMessenger
