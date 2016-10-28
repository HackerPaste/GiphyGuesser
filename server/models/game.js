const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  author: { type: String, required: true },
  text: {
    type: String,
    minLength: 3,
    maxLength: 140
  }
})

const gameSchema = new Schema({
  //the topic of the game
  topic: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /[a-z ]{3,40}/i
  },
  users: [ {type: Schema.Types.ObjectId, ref: 'User'}],
  ended: { type: Boolean, default: false },
  maxPlayers: Number,

  // the current phrase players need to guess
  keyword: {
    type: String,
    lowercase: true,
    trim: true,
    match: /[a-z ]{3,40}/i
  },
  image: String,

  // id of the user who set the current keyword
  leader: String,
  guessable: { type: Boolean, default: false }
})

module.exports = mongoose.model('Game', gameSchema)
