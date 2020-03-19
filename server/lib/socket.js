import socketIO from 'socket.io'

import { addMeasurement } from './db'

export default class Socket {
  constructor(server) {
    this.io = socketIO(server)
    this.clients = new Set()
  }

  listen() {
    this.io.on('connection', client => {
      this.clients.add(client)
      client.on('disconnect', () => this.clients.delete(client))

      client.on('add measurement', (type, data, timestamp) => {
        const measurement = addMeasurement(type, data, timestamp)
        this.emit(measurement)
      })
    })
  }

  emit(data) {
    this.clients.forEach(client => client.emit(data))
  }
}
