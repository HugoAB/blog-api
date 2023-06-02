const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const conn = require('../config/db')
require('dotenv').config()

const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)

  const sql = "INSERT INTO user (email, firstname, lastname, password) VALUES (?, ?, ?, ?)"

  conn.query("SELECT * FROM user WHERE email=?", email, (err, result) => {
    if(err) {
      return res.status(500).json({
        error: err.message
      })
    }
    if((result.length > 0) && (email === result[0].email)) {
      return res.status(400).json({
        error: 'User already exists.'
      })
    } else {
      conn.query(sql, [email, firstname, lastname, passwordHash], (err, result) => {
        if(err) {
          return res.status(500).json({
            error: err.message
          })
        }
        res.status(201).json({
          message: 'New User Created'
        })
      })
    }
  })
}

const login = (req, res) => {
  const { email, password } = req.body
  const sql = "SELECT * FROM user WHERE email=?"

  if(!email || !password) {
    res.status(400).json({
      error: "All fields are required."
    })
  }

  conn.query(sql, email, async (err, result) => {
    if(err) {
      return res.status(500).json({
        error: err.message
      })
    } else if(result.length <= 0) {
      return res.status(404).json({
        error: "User not registered."
      })
    } else {
      const correctPassword = await bcrypt.compare(password, result[0].password)
      if(!correctPassword) {
        return res.status(404).json({
          error: "Wrong password."
        })
      }
      const token = jwt.sign(
          { user_id: result[0].id, email },
          process.env.SECRET_KEY,
          { expiresIn: "2h" }
      )
      res.status(200).json({...result[0], token: token})
    }
    
  })
}

module.exports = {
  register,
  login
}