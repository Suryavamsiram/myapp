// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const flashcardRoutes = require('./routes/flashcards');
const categoryRoutes = require('./routes/categories');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/categories', categoryRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});