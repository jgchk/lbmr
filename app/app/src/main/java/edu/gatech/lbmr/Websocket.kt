package edu.gatech.lbmr

import android.util.Log
import com.neovisionaries.ws.client.HostnameUnverifiedException
import com.neovisionaries.ws.client.OpeningHandshakeException
import com.neovisionaries.ws.client.WebSocketException
import com.neovisionaries.ws.client.WebSocketFactory
import edu.gatech.lbmr.extension.TAG


class Websocket {
    private val factory = WebSocketFactory()
    private val ws = factory.createSocket("ws://localhost:3000/api/data")

    fun connect() {
        try {
            // Connect to the server and perform an opening handshake.
            // This method blocks until the opening handshake is finished.
            ws.connect()
        } catch (e: OpeningHandshakeException) {
            // A violation against the WebSocket protocol was detected
            // during the opening handshake.

            // Status line.
            val sl = e.statusLine
            Log.e(TAG, "=== Status Line ===")
            Log.e(TAG, "HTTP Version  = ${sl.httpVersion}")
            Log.e(TAG, "Status Code   = ${sl.statusCode}")
            Log.e(TAG, "Reason Phrase = ${sl.reasonPhrase}")

            // HTTP headers.
            val headers = e.headers
            Log.d(TAG, "=== HTTP Headers ===")
            for ((name, values) in headers) { // Header name.
                // Values of the header.
                if (values == null || values.size == 0) { // Print the name only.
                    Log.e(TAG, name)
                    continue
                }
                values.forEach { Log.e(TAG, "${name}: $it") }
            }
        } catch (e: HostnameUnverifiedException) {
            // The certificate of the peer does not match the expected hostname.
        } catch (e: WebSocketException) {
            // Failed to establish a WebSocket connection.
        }
    }
}

