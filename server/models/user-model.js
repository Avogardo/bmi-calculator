const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  googleId: String,
  imageUrl: String,
  gender: String,
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: 0,
  },
  neededDailyCal: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
