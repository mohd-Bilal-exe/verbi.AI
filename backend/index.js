require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/users'); // Import userRoutes
const postRoutes = require('./routes/posts'); // Import postRoutes
const AI = require('./routes/AI'); // Import aiRoutes routes

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB ${mongoose.connection.db.databaseName}`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Use the user routes
app.use('/users', userRoutes); // Mount the user routes at '/users'
// Use the post routes
app.use('/posts', postRoutes); // Mount the post routes at '/posts'
// Use the summaryAI routes
app.use('/AI', AI); // Mount the summaryAI routes at '/summaryAI'

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
