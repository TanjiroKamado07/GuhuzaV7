const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();  // Load environment variables
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse JSON request body
app.use(express.static(path.join(__dirname, "public")));  // Serve static frontend files from public folder

// ✅ Import Routes
const authRoutes = require("./routes/auth");  // Authentication routes
const leaderboardRoutes = require("./routes/leaderboard");  // Leaderboard routes

// ✅ Use Routes
app.use("/api/auth", authRoutes);  // Route for authentication-related requests
app.use("/api/leaderboard", leaderboardRoutes);  // Route for leaderboard-related requests

// ✅ Default Route for Testing
app.get("/", (req, res) => {
    res.send("✅ Server is running...");
});

// ✅ Serve `leaderboard.html` correctly when accessed directly
app.get("/leaderboard.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "leaderboard.html"));
});

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/guhuza";  // Use environment variable or default to local MongoDB

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start the Server
const PORT = process.env.PORT || 5000;  // Port can be taken from environment variable or default to 5000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// Backend route to handle score update
app.post('/api/quiz/finish', async (req, res) => {
    const { username, score } = req.body; // Assume these values are sent from the frontend

    try {
        // Find the user in the database
        const user = await User.findOne({ fullName: username });

        // If the user exists, update their score
        if (user) {
            user.score += score; // Increment the score
            await user.save();
            res.status(200).json({ message: 'Score updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating score', error });
    }
});
