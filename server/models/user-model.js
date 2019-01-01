const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  googleId: String,
  imageUrl: String,
  dishes: { type: [String], default: [] },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
