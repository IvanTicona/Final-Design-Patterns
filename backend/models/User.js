const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  // Evita usuarios duplicados
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
  }
});

module.exports = mongoose.model('User', UserSchema);
