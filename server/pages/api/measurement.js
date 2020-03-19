import { addMeasurement } from '../../lib/db'

function isNotDefined(val) {
  return val === null || val === undefined
}

export default (req, res) => {
  if (!req.body)
    return res.status(400).json({ error: 'A measurement is required' })

  try {
    const measurement = JSON.parse(req.body)

    const { type, data, timestamp } = measurement
    if (isNotDefined(type))
      return res.status(400).json({ error: 'type is required' })
    if (isNotDefined(data))
      return res.status(400).json({ error: 'data is required' })
    if (isNotDefined(timestamp))
      return res.status(400).json({ error: 'timestamp is required' })

    const numTimestamp = Date.parse(timestamp)
    if (Number.isNaN(numTimestamp))
      return res
        .status(400)
        .json({ error: 'timestamp must be a valid datetime' })

    const response = addMeasurement(type, data, numTimestamp)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' })
  }
}
