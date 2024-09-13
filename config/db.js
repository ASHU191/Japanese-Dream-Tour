// config/db.js

const mongoose = require("mongoose");
const { MONGO_URI } = process.env; // Ensure your MongoDB URI is set in environment variables

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;
