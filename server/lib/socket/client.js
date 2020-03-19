import socketIO from 'socket.io-client'

export default class Socket {
  constructor() {
    this.io = socketIO(window.location.origin)
    this.io.connect()
  }

  listen() {
    this.io.on('connect', () => console.log('connected'))
  }

  on(event, callback) {
    this.io.on(event, callback)
  }

  emit(event, data) {
    this.io.emit(event, data)
  }
}
