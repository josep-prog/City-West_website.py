// db.js - Database Connection Configuration for City West Restobar

const mongoose = require('mongoose');

// Get the MongoDB URI from the environment variable (ensure to set this up in your environment)
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/citywest_restobar'; // Default to local DB if not specified

// Set mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Connect to MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    // Log a success message if the connection is successful
    console.log('Connected to City West Restobar Database successfully');
  } catch (error) {
    // Log any error if the connection fails
    console.error('Failed to connect to the City West Restobar Database:', error);
    process.exit(1); // Exit the application with an error code
  }
};

// Export the database connection function for use in the main application file
module.exports = connectDB;