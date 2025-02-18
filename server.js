const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Import Authentication Routes
const authRoutes = require("./routes/auth"); 
app.use("/api/auth", authRoutes); // ✅ Registering auth routes

// ✅ Test Route - To check if the server is working
app.get("/", (req, res) => {
    res.send("✅ Server is running...");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    