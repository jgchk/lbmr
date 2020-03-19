package edu.gatech.lbmr.heart_rate

import android.app.Activity
import android.util.Log
import edu.gatech.lbmr.extension.TAG
import polar.com.sdk.api.PolarBleApi
import polar.com.sdk.api.PolarBleApiCallback
import polar.com.sdk.api.PolarBleApiDefaultImpl
import polar.com.sdk.api.errors.PolarInvalidArgument
import polar.com.sdk.api.model.PolarDeviceInfo
import polar.com.sdk.api.model.PolarHrData


class HeartRateApi(activity: Activity) {

    private var api: PolarBleApi =
        PolarBleApiDefaultImpl.defaultImplementation(activity, PolarBleApi.FEATURE_HR)

    init {
        api.setPolarFilter(false)
        api.setApiCallback(object : PolarBleApiCallback() {
            override fun deviceConnected(polarDeviceInfo: PolarDeviceInfo) {
                Log.d(TAG, "CONNECTED: " + polarDeviceInfo.deviceId)
            }

            override fun deviceConnecting(polarDeviceInfo: PolarDeviceInfo) {
                Log.d(TAG, "CONNECTING: " + polarDeviceInfo.deviceId)
            }

            override fun hrFeatureReady(identifier: String) {
                Log.d(TAG, "HR READY: $identifier")
            }

            override fun hrNotificationReceived(
                identifier: String,
                data: PolarHrData
            ) {
                Log.d(TAG, "HR value: " + data.hr)
            }
        })
    }

    fun pause() {
        api.backgroundEntered()
    }

    fun resume() {
        api.foregroundEntered()
    }

    fun destroy() {
        api.shutDown()
    }

    fun connectDevice(deviceId: String) {
        try {
            Log.d(TAG, "trying to connect")
            api.connectToDevice(deviceId)
        } catch (polarInvalidArgument: PolarInvalidArgument) {
            Log.d(TAG, "couldn't connect")
            polarInvalidArgument.printStackTrace()
        }
    }
}