// server.js - Main Backend File for City West Restobar

// Import necessary libraries and modules
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Allows Cross-Origin Resource Sharing (CORS)

// Connect to the MongoDB database
connectDB();

// Define API routes
app.use('/api/auth', authRoutes);        // Authentication Routes (Login & Registration)
app.use('/api/booking', bookingRoutes);  // Booking API Routes
app.use('/api/order', orderRoutes);      // Order API Routes
app.use('/api/event', eventRoutes);      // Events API Routes

// Default route for home or API health check
app.get('/', (req, res) => {
  res.send('Welcome to City West Restobar API!');
});

// Port configuration from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});