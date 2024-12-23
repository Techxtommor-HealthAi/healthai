// filepath: /c:/Users/Yash_MSI/Desktop/c-/Personal Projects/healthai/src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);