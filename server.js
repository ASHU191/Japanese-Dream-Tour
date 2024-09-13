const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/db.js");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const couponRoutes = require("./routes/couponRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const mapRoutes = require("./routes/mapRoutes");
const tourRoutes = require('./routes/tourRoutes')

// Initialize Express app
const app = express();
const MONGO_URI = process.env.MONGO_URI;
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/maps", mapRoutes);
app.use('/api/tours',tourRoutes)

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure code
  }
};

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
