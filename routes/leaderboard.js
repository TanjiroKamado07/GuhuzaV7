const express = require("express");
const User = require("../models/User");

const router = express.Router();

// ✅ Fetch Top 10 Users for Leaderboard
router.get("/top", async (req, res) => {
    try {
        const topUsers = await User.find({}, "fullName score")
            .sort({ score: -1 })
            .limit(10)
            .lean();
        
        const leaderboardData = topUsers.map((user, index) => ({
            rank: index + 1,
            username: user.fullName,
            score: user.score ?? 0
        }));

        res.status(200).json(leaderboardData);
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
    }
});


// ✅ Update Score When User Completes a Level
// ✅ Update Score When User Completes a Level
router.post("/update-score", async (req, res) => {
    try {
        const { username, level, points } = req.body;

        // ✅ Validate Request Body
        if (!username || !level || typeof points !== "number" || points < 0 || points > 10) {
            return res.status(400).json({ message: "Missing or invalid required fields (username, level, points)." });
        }

        // ✅ Find user by username
        let user = await User.findOne({ fullName: username });

        // ✅ Handle case where user does not exist
        if (!user) {
            return res.status(404).json({ message: `User with username '${username}' not found.` });
        }

        // ✅ Initialize levelsCompleted if missing
        if (!user.levelsCompleted) {
            user.levelsCompleted = new Map();
        }

        // ✅ Check if the user has already completed this level
        if (user.levelsCompleted.get(level)) {
            return res.status(400).json({ message: `Level '${level}' already completed. Score won't be updated.` });
        }

        // ✅ Add points if the level is completed for the first time
        user.score += points;  // Add points to the user's score
        user.levelsCompleted.set(level, true);  // Mark this level as completed

        // ✅ Save the updated user data
        await user.save();
        res.json({ message: "Score updated successfully.", newScore: user.score });

    } catch (error) {
        console.error("❌ Error updating score:", error);
        res.status(500).json({ message: "Error updating score", error: error.message });
    }
});


module.exports = router;
