package edu.gatech.lbmr

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import edu.gatech.lbmr.extension.TAG
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private var heartRateApi: HeartRateApi? = null
    private lateinit var sensors: Sensors

    private var measurementsApi: MeasurementsApi? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        enableHeartRateApi()
        enableSensorApi()
        enableMeasurementApi()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun checkBluetoothPermission(): Boolean {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.BLUETOOTH
            )
            != PackageManager.PERMISSION_GRANTED
        ) {
            // Permission is not granted
            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(
                    this,
                    Manifest.permission.BLUETOOTH
                )
            ) {
                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
                AlertDialog.Builder(this)
                    .setMessage("test")
                    .setTitle("test")
                    .create()
                    .show()
            } else {
                // No explanation needed, we can request the permission.
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(Manifest.permission.BLUETOOTH),
                    PERMISSIONS_REQUEST_BLUETOOTH
                )
            }
        } else {
            // Permission has already been granted
            return true
        }
        return false
    }

    private fun checkInternetPermission(): Boolean {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.INTERNET
            )
            != PackageManager.PERMISSION_GRANTED
        ) {
            // Permission is not granted
            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(
                    this,
                    Manifest.permission.INTERNET
                )
            ) {
                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
                AlertDialog.Builder(this)
                    .setMessage("Internet is required to report sensor measurements to the server")
                    .create()
                    .show()
            } else {
                // No explanation needed, we can request the permission.
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(Manifest.permission.INTERNET),
                    PERMISSIONS_REQUEST_INTERNET
                )
            }
        } else {
            // Permission has already been granted
            return true
        }
        return false
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>, grantResults: IntArray
    ) {
        when (requestCode) {
            PERMISSIONS_REQUEST_BLUETOOTH -> {
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    // permission was granted, yay!
                    enableHeartRateApi()
                } else {
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                    heartRateApi = null
                }
                return
            }
            PERMISSIONS_REQUEST_INTERNET -> {
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    // permission was granted, yay!
                    enableMeasurementApi()
                } else {
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                    measurementsApi = null
                }
                return
            }

            // Add other 'when' lines to check for other
            // permissions this app might request.
            else -> {
                // Ignore all other requests.
            }
        }
    }

    private fun enableHeartRateApi() {
        if (!checkBluetoothPermission()) return
        heartRateApi = HeartRateApi(this)
        heartRateApi!!.connectDevice(DEVICE_ID)
    }

    private fun enableSensorApi() {
        sensors = Sensors(this)
        sensors.subscribe {
            Log.d(TAG, "Event: $it")
            measurementsApi?.addMeasurement(it)
        }
        sensors.start()
    }

    private fun enableMeasurementApi() {
        measurementsApi = MeasurementsApi()
        measurementsApi!!.connect()
    }

    override fun onPause() {
        super.onPause()
        heartRateApi?.pause()
        sensors.stop()
        measurementsApi?.disconnect()
    }

    override fun onResume() {
        super.onResume()
        heartRateApi?.resume()
        sensors.start()
        measurementsApi?.connect()
    }

    override fun onDestroy() {
        super.onDestroy()
        heartRateApi?.destroy()
        sensors.stop()
        measurementsApi?.disconnect()
    }

    companion object {
        const val DEVICE_ID = "682FF628"
        const val PERMISSIONS_REQUEST_BLUETOOTH = 1
        const val PERMISSIONS_REQUEST_INTERNET = 2
    }
}
