const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { userModel: UserModel } = require('../models/Models');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  next();
};

// Route to get all users
router.get('/getusers', async (req, res) => {
  console.log('Root route hit ');  // Log to confirm route is hit
  try {
    const users = await UserModel.find();
    console.log('Users fetched:', users);  // Log users to the console
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route to get a user by ID
router.get('/getusers/:id', validateObjectId, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Route to create a new user
router.post('/createuser', async (req, res) => {
  const { username, email, password, profilePic, bio } = req.body;
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password,
    profilePic,
    bio,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Route to update a user by ID
router.put('/updateuser/:id', validateObjectId, async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Route to delete a user by ID
router.delete('/deleteuser/:id', validateObjectId, async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
