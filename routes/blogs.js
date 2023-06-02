const { getPostById, createPost, getAllPosts, updatePost, deletePost } = require('../controllers/blogs')

const blogsRouter = require('express').Router()

blogsRouter.get('/', getAllPosts)
blogsRouter.get('/:id', getPostById)
blogsRouter.post('/', createPost)
blogsRouter.put('/:id', updatePost)
blogsRouter.delete('/:id', deletePost)

module.exports = blogsRouter