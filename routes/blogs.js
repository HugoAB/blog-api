const { getAll, getById } = require('../controllers/blogs')

const blogsRouter = require('express').Router()

blogsRouter.get('/', getAll)
blogsRouter.get('/:id', getById)

module.exports = blogsRouter