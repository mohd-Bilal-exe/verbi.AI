const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { postModel: PostModel } = require('../models/Models');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
};

// Route to get all posts
router.get('/getPosts', async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author', 'username email');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Route to get posts by a specific user ID
router.get('/getPostof/:userId', async (req, res) => {
  try {
    const posts = await PostModel.find({ author: req.params.userId }).populate('author', 'username email');
    if (posts.length > 0) {
      res.json(posts);
    } else {
      res.status(404).json({ message: 'No posts found for this user' });
    }
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Error fetching user posts' });
  }
});

// Route to create a new post
router.post('/addPost', async (req, res) => {
  const { title, content, author } = req.body;
  const post = new PostModel({
    _id: new mongoose.Types.ObjectId(),
    title,
    content,
    author,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Route to update a post by ID
router.put('/updatePost/:id', validateObjectId, async (req, res) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Route to delete a post by ID
router.delete('/deletePost/:id', validateObjectId, async (req, res) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

module.exports = router;