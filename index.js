const app = require('./app')
const conn = require('./config/db')

// connect db
conn.connect(err => {
  if(err) {
    console.log("Error connecting to MySQL", err)
  } else {
    console.log("Connected to MySQL")
  }
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})