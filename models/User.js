const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Keep password as plain text
    fullName: { type: String, required: true },
    score: { type: Number, default: 0 },
    levelsCompleted: { type: Map, of: Boolean } // For storing completed levels
});

module.exports = mongoose.model('User', UserSchema);
