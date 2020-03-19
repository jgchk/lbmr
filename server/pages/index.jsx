import React from 'react'
import dynamic from 'next/dynamic'

const SocketClient = dynamic(() => import('../components/SocketClient'), {
  ssr: false
})

const Index = () => <SocketClient />

export default Index
