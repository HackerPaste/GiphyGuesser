const mongoose = require('mongoose')
//hashing tool
//average number of rounds
const Schema = mongoose.Schema
//set up for a new user
const userSchema = new Schema({
  name: { type: String, required: true },
  facebookId: { type: String, required: true, unique: true },
  profilePic: String,
  token: String
})

const User = mongoose.model('User', userSchema)
module.exports = User
