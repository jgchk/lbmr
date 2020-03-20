import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import nanoid from 'nanoid'

import Socket from '../../lib/socket/client'
import SocketMessage from '../SocketMessage'
import SocketMessenger from '../SocketMessenger'
import DownloadButton from '../DownloadButton'

import styles from './styles.module.less'

const SocketClient = () => {
  const [measurements, setMeasurements] = useState([])
  const addMeasurement = useCallback(
    measurement =>
      setMeasurements(msmts => [...msmts, { id: nanoid(), measurement }]),
    []
  )

  const io = useMemo(() => {
    const socket = new Socket()
    socket.on('measurement', measurement =>
      addMeasurement({
        type: measurement.type,
        data: measurement.data,
        timestamp: measurement.timestamp
      })
    )
    socket.listen()
    return socket
  }, [addMeasurement])
  const sendMeasurement = useCallback(
    measurement => io.emit('add measurement', measurement),
    [io]
  )

  const endRef = useRef(null)
  const scrollToBottom = useCallback(
    () => endRef.current.scrollIntoView({ behavior: 'smooth' }),
    []
  )
  useEffect(scrollToBottom, [scrollToBottom, measurements])

  const downloadUrl = useMemo(() => {
    const blob = new Blob(
      [JSON.stringify(measurements.map(msmt => msmt.measurement))],
      {
        type: 'application/json'
      }
    )
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl)
    return window.URL.createObjectURL(blob)
  }, [measurements])

  return (
    <div className={styles.container}>
      <div className={styles.download}>
        <DownloadButton url={downloadUrl} />
      </div>
      <div className={styles.flex}>
        <div className={styles.messages}>
          {measurements
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(({ id, measurement }) => {
              const message = JSON.stringify(measurement, null, 2)
              return <SocketMessage key={id} message={message} />
            })}
          <div className={styles.end} ref={endRef} />
        </div>
        <div className={styles.messenger}>
          <SocketMessenger onSend={sendMeasurement} />
        </div>
      </div>
    </div>
  )
}

export default SocketClient
