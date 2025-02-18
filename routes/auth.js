const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// ✅ Test Route - To check if the auth route is working
router.get("/", (req, res) => {
    res.send("✅ Auth Routes are working!");
});

// 🔹 SIGNUP ROUTE
router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate all fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and Save User
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});
// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ msg: "Login successful", token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
