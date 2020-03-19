package edu.gatech.lbmr

import android.util.Log
import edu.gatech.lbmr.extension.TAG
import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter

class WebSocket {
    private val socket = IO.socket("http://localhost:3000/")

    init {
        socket.on("connected") { Log.d(TAG, "connected") }
        socket.on("disconnected") { Log.d(TAG, "disconnected") }
    }

    fun connect(): Socket = socket.connect()
    fun disconnect(): Socket = socket.disconnect()

    fun emit(event: String, vararg args: Any): Emitter = socket.emit(event, *args)
}
