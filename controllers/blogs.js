const conn = require('../config/db')

const getAll = (req, res) => {
  const sql = "SELECT * FROM post"
  conn.query(sql, (err, results) => {
    if(err) {
      res.json({
        error: err.message
      })
    }
    const rows = JSON.parse(JSON.stringify(results))
    res.status(200).json(rows)
  })
}

const getById = (req, res) => {
  const { id } = req.params
  const sql = "SELECT * FROM post WHERE id=?"

  conn.query(sql, id, (err, data) => {
    if(err) {
      res.status(500).json({
        error: err
      })
    } else if(data.length <= 0) {
      res.status(404).json({
        error: '404 Not Found'
      })
    } else {
      res.status(200).json(data)
    }
  })
}


module.exports = {
  getAll,
  getById
}