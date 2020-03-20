import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import nanoid from 'nanoid'

import Socket from '../../lib/socket/client'
import SocketMessage from '../SocketMessage'
import SocketMessenger from '../SocketMessenger'

import styles from './styles.module.less'

const SocketClient = () => {
  const [messages, setMessages] = useState([])
  const addMessage = useCallback(
    message => setMessages(msgs => [...msgs, { id: nanoid(), message }]),
    []
  )

  const io = useMemo(() => {
    const socket = new Socket()
    socket.on('measurement', measurement =>
      addMessage(
        JSON.stringify(
          {
            type: measurement.type,
            data: measurement.data,
            timestamp: measurement.timestamp
          },
          null,
          2
        )
      )
    )
    socket.listen()
    return socket
  }, [addMessage])

  const sendMeasurement = useCallback(
    measurement => io.emit('add measurement', measurement),
    [io]
  )

  const endRef = useRef(null)
  const scrollToBottom = useCallback(
    () => endRef.current.scrollIntoView({ behavior: 'smooth' }),
    []
  )

  useEffect(scrollToBottom, [scrollToBottom, messages])

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages
          .sort((a, b) => a.timestamp - b.timestamp)
          .map(({ id, message }) => (
            <SocketMessage key={id} message={message} />
          ))}
        <div className={styles.end} ref={endRef} />
      </div>
      <div className={styles.messenger}>
        <SocketMessenger onSend={sendMeasurement} />
      </div>
    </div>
  )
}

export default SocketClient
