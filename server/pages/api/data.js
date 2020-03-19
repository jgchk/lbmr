import { getMeasurements } from '../../lib/db'

export default (req, res) => {
  const data = getMeasurements()
  return res.status(200).json(data)
}
