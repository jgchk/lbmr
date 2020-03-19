package edu.gatech.lbmr

import io.socket.emitter.Emitter
import org.json.JSONObject

class MeasurementsApi {
    private val ws = WebSocket()
    fun connect() = ws.connect()
    fun disconnect() = ws.disconnect()

    fun addMeasurement(measurement: SensorData): Emitter =
        if (measurement is VectorData)
            addVectorData(measurement)
        else
            addSensorData(measurement)

    private fun addSensorData(sensorData: SensorData) =
        ws.emit("add measurement", JSONObject(mapOf("type" to sensorData.type)))

    private fun addVectorData(vectorData: VectorData) = ws.emit(
        "add measurement", JSONObject(
            mapOf(
                "type" to vectorData.type,
                "x" to vectorData.x,
                "y" to vectorData.y,
                "z" to vectorData.z
            )
        )
    )
}