import Loki from 'lokijs'

const db = new Loki('lbmr')
const measurements = db.addCollection('measurements')

export function addMeasurement(type, data, timestamp) {
  return measurements.insert({ type, data, timestamp })
}

const allView = measurements.addDynamicView('all').applySimpleSort('timestamp')

export function getMeasurements() {
  return allView.data()
}
