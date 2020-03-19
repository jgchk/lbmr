import React, { useState, useCallback, useMemo } from 'react'
import nanoid from 'nanoid'
import dynamic from 'next/dynamic'

import SocketMessage from '../SocketMessage'
import SocketMessenger from '../SocketMessenger'

const Socket = dynamic(() => import('../../lib/socket/client'), { ssr: false })

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

  return (
    <div>
      <div>
        {messages
          .sort((a, b) => a.timestamp - b.timestamp)
          .map(({ id, message }) => (
            <SocketMessage key={id} message={message} />
          ))}
      </div>
      <SocketMessenger onSend={sendMeasurement} />
    </div>
  )
}

export default SocketClient
