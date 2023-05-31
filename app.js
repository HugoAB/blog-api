const express = require('express')
const cors = require('cors')
const blogsRouter = require('./routes/blogs')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogsRouter)

module.exports = app