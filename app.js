const express = require('express')
const cors = require('cors')
const blogsRouter = require('./routes/blogs')
const authRouter = require('./routes/auth')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogsRouter)
app.use('/api/auth', authRouter)

module.exports = app