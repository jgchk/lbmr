import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

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
    <form onSubmit={onSubmit}>
      <label htmlFor='sensor-type'>
        Sensor:
        <select
          id='sensor-type'
          value={sensorType}
          onChange={onSensorTypeChange}
        >
          <option value='rotation'>Gyroscope</option>
          <option value='acceleration'>Accelerometer</option>
        </select>
      </label>

      <label htmlFor='sensor-data'>
        Data:
        <fieldset id='sensor-data'>
          <label htmlFor='data-x'>
            x:
            <input
              id='data-x'
              type='number'
              step='any'
              value={x}
              onChange={onXChange}
            />
          </label>
          <label htmlFor='data-y'>
            y:
            <input
              id='data-y'
              type='number'
              step='any'
              value={y}
              onChange={onYChange}
            />
          </label>
          <label htmlFor='data-z'>
            z:
            <input
              id='data-z'
              type='number'
              step='any'
              value={z}
              onChange={onZChange}
            />
          </label>
        </fieldset>
      </label>

      <input type='submit' value='Submit' />
    </form>
  )
}

SocketMessenger.propTypes = {
  onSend: PropTypes.func.isRequired
}

export default SocketMessenger
