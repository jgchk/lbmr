import socketIO from 'socket.io'

import Database from '../db'

export default class Socket {
  constructor(server) {
    this.io = socketIO(server)
    this.clients = new Set()

    this.db = new Database()
  }

  listen() {
    this.io.on('connection', client => {
      this.clients.add(client)
      client.on('disconnect', () => this.clients.delete(client))

      client.on('add measurement', measurement =>
        this.db.addMeasurement(measurement)
      )
    })

    this.db.on('add measurement', measurement =>
      this.emit('measurement', measurement)
    )
  }

  emit(event, data) {
    this.clients.forEach(client => client.emit(event, data))
  }
}
