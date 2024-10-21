const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true, // Optional, if userId needs to be unique
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false, // Default to false if not provided
    },
  },
  { timestamps: true } // Fixed typo and enabled timestamps
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel; // Fixed export statement
