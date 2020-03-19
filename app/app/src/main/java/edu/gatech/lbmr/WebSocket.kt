package edu.gatech.lbmr

import android.util.Log
import edu.gatech.lbmr.extension.TAG
import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter
import java.util.*


class WebSocket {
    private val socket = IO.socket("http://167.99.146.97/")

    init {
        socket.on(Socket.EVENT_CONNECTING) { Log.d(TAG, "connecting...") }
        socket.on(Socket.EVENT_CONNECT) { Log.d(TAG, "connected") }
        socket.on(Socket.EVENT_CONNECT_ERROR) {
            Log.d(
                TAG,
                "connection error: ${Arrays.toString(it)}"
            )
        }
        socket.on(Socket.EVENT_CONNECT_TIMEOUT) { Log.d(TAG, "connection timeout") }
        socket.on(Socket.EVENT_DISCONNECT) { Log.d(TAG, "disconnected") }
        socket.on(Socket.EVENT_ERROR) { Log.d(TAG, "error: ${Arrays.toString(it)}") }
    }

    fun connect(): Socket = socket.connect()
    fun disconnect(): Socket = socket.disconnect()

    fun emit(event: String, vararg args: Any): Emitter {
        Log.d(TAG, "event: ${args.contentToString()}")
        return socket.emit(event, *args)
    }
}
