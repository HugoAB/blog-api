const mysql = require('mysql')
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hugo',
  password: 'Temporal2022**',
  database: 'blogsApp',
})
  

module.exports = conn