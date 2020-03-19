import Database from '../../lib/db'

export default (req, res) => {
  const data = new Database().getMeasurements()
  return res.status(200).json(data)
}
