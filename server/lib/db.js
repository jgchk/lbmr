import EventEmitter from 'events'
import Loki from 'lokijs'

export default class Database {
  constructor() {
    const { instance } = this.constructor
    if (instance) return instance
    this.constructor.instance = this

    this.ee = new EventEmitter()

    this.db = new Loki('lbmr')
    this.measurements = this.db.addCollection('measurements')
  }

  on(event, callback) {
    this.ee.addListener(event, callback)
  }

  addMeasurement(measurement) {
    const res = this.measurements.insert(measurement)

    const event = 'add measurement'
    this.ee.emit(event, res)

    return res
  }

  getMeasurements() {
    let allView = this.measurements.getDynamicView('all')
    if (!allView)
      allView = this.measurements
        .addDynamicView('all')
        .applySimpleSort('timestamp')

    return allView.data()
  }
}
