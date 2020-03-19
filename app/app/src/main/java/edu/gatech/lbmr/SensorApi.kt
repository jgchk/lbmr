package edu.gatech.lbmr

import android.app.Activity
import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager

class SensorApi(activity: Activity) : SensorEventListener {

    private val sensorManager: SensorManager =
        activity.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val sensors = sensorManager.getSensorList(Sensor.TYPE_ALL)

    fun getSensor(type: Int): Sensor? {
        return sensorManager.getDefaultSensor(type)
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
    override fun onSensorChanged(event: SensorEvent?) {
        if (event != null)
            emit(event)
    }


    private val listeners = mutableMapOf<Sensor, List<(SensorEvent) -> Unit>>()

    fun subscribe(sensor: Sensor, callback: (SensorEvent) -> Unit) {
        val sensorListeners = listeners[sensor] ?: emptyList()
        listeners[sensor] = sensorListeners.plus(callback)
    }

    private fun emit(event: SensorEvent) {
        val sensorListeners = listeners[event.sensor] ?: emptyList()
        sensorListeners.forEach { listener -> listener(event) }
    }


    fun start() {
        sensors.forEach {
            sensorManager.registerListener(
                this,
                it,
                SensorManager.SENSOR_DELAY_NORMAL
            )
        }
    }

    fun stop() {
        sensorManager.unregisterListener(this)
    }
}