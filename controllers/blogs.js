const { json } = require('express')
const conn = require('../config/db')

const getAllPosts = (req, res) => {
  const sql = `
    SELECT post.title, post.content, post.publishedAt,
    CONCAT(user.firstname, " ", user.lastname) AS author
    FROM post
    JOIN user
    ON post.user_id = user.id;
  `
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

const getPostById = (req, res) => {
  const { id } = req.params
  const sql = `
    SELECT post.title, post.content, post.publishedAt,
    CONCAT(user.firstname, " ", user.lastname) AS author
    FROM post
    JOIN user
    ON post.user_id = user.id
    WHERE post.id=?;
  `

  conn.query(sql, id, (err, data) => {
    if(err) {
      res.status(500).json({
        error: err
      })
    } else if(data.length <= 0) {
      res.status(404).json({
        error: '404 Not Found.'
      })
    } else {
      res.status(200).json(data)
    }
  })
}

const createPost = (req, res) => {
  const { title, content } = req.body
  const sql = "INSERT INTO post (title, content, user_id) VALUES(?, ?, ?)"
  if(!title || !content) {
    res.status(400).json({
      error: 'All fields are required.'
    })
  }
  conn.query(sql, [title, content, req.user.user_id], (err, data) => {
    if(err) {
      res.status(500).json({
        error: err.message
      })
    }
    res.status(201).json({
      message: "New post added successfully.",
      data
    })
  })
}

const updatePost = (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  const sql = "UPDATE post SET title=?, content=? WHERE id=?"
  
  conn.query(sql, [title, content, id], (err, result) => {
    if(err) {
      res.status(500).json({ error: err.message })
    } else if(result.affectedRows <= 0) {
      res.status(404).json({
        error: "404 Not Found."
      })
    } else {
      res.json("Post Updated.")
    }
  })
}

const deletePost = (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM post WHERE id=?"

  conn.query(sql, id, (err, result) => {
    if(err) {
      res.status(500).json({
        error: err.message
      })
    } else if(result.affectedRows <= 0) {
      res.status(404).json({
        error: '404 Not Found.'
      })
    } else {
      res.status(204).end()
    }
    
  })
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}