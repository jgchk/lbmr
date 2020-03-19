package edu.gatech.lbmr

import android.app.Activity
import android.hardware.Sensor
import android.hardware.SensorEvent

class Sensors(activity: Activity) {
    private val api = SensorApi(activity)
    fun start() = api.start()
    fun stop() = api.stop()

    init {
        val accelerometer = api.getSensor(Sensor.TYPE_LINEAR_ACCELERATION)
        if (accelerometer != null)
            api.subscribe(accelerometer) { emit(VectorData(it, "acceleration")) }

        val rotation = api.getSensor(Sensor.TYPE_ROTATION_VECTOR)
        if (rotation != null)
            api.subscribe(rotation) { emit(VectorData(it, "rotation")) }
    }

    private val listeners = mutableListOf<(SensorData) -> Unit>()
    fun subscribe(callback: (SensorData) -> Unit) = listeners.add(callback)
    private fun emit(data: SensorData) = listeners.forEach { listener -> listener(data) }
}

open class SensorData(open val sensor: Sensor, open val type: String)

data class VectorData(
    override val sensor: Sensor,
    override val type: String,
    val x: Float,
    val y: Float,
    val z: Float
) : SensorData(sensor, type) {
    constructor(event: SensorEvent, type: String) : this(
        event.sensor,
        type,
        event.values[0],
        event.values[1],
        event.values[2]
    )
}
