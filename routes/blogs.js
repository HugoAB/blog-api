const { getPostById, createPost, getAllPosts, updatePost, deletePost } = require('../controllers/blogs')
const blogsRouter = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')

blogsRouter.get('/', getAllPosts)
blogsRouter.get('/:id', getPostById)
blogsRouter.post('/', verifyToken, createPost)
blogsRouter.put('/:id', verifyToken, updatePost)
blogsRouter.delete('/:id', verifyToken, deletePost)

module.exports = blogsRouter