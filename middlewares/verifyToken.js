const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['bearer-token']

  if(!token) {
    return res.status(403).send('Token is required for authentication')
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
  } catch (error) {
    return res.status(401).send('Invalid token')
  }
  return next()
}

module.exports = verifyToken