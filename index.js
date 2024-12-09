const cors = require("cors");
const express = require("express");
const { connectToDatabase } = require("./database/mongoose");
require("dotenv").config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8080;

const attendanceSessionRoutes = require("./routes/attendanceSessionRoutes");
const attendanceDataRoutes = require("./routes/attendanceDataRoutes");
const attendanceHistoryRoutes = require("./routes/attendanceHistoryRoutes");

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // Atau set ke domain tertentu
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  

app.use(express.json());
// Set up the database connection
const startDatabase = async () => {
  try {
    await connectToDatabase();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

startDatabase();

// Use routes for sessions and attendance
app.use("/api/sessions", attendanceSessionRoutes);
app.use("/api/attendance", attendanceDataRoutes);
app.use("/api/history", attendanceHistoryRoutes);


// Listen on the specified port and bind to all IP addresses
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});

// Custom function to generate QR Code data with dynamic base URL
const generateQRCodeData = (sessionId) => {
  // Using the environment variable for base URL
  const baseUrl = process.env.BASE_URL; // Fetch the base URL from the .env file
  if (!baseUrl) {
    console.error("BASE_URL is not defined in .env file");
    return;
  }

  // Returning the complete URL for the session
  return `${baseUrl}/dashboard/all-session/${sessionId}`;
};

module.exports = { generateQRCodeData };  // Export the function if needed elsewhere
