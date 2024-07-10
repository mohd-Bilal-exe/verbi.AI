require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const AI = require("./routes/AI"); // Import aiRoutes routes

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Use the summaryAI routes
app.use("/AI", AI); // Mount the summaryAI routes at '/summaryAI'

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
