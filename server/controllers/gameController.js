var axios = require('axios')
var io = require('../socket').io
const Game = require('../models/game')

var giphy = axios.create({ baseURL: 'http://api.giphy.com/v1/gifs' });
const games = module.exports

games.fetchGiphy = function (keyword) {
  return giphy.get(`/search?q=${keyword}&api_key=${process.env.GIPHY_KEY || 'dc6zaTOxFJmzC'}`)
    .then(res => res.data)
}

games.create = function (topic, userId) {
  if (!topic || !userId) {
    return Promise.reject(new BadRequest('topic and userId are required'))
  }
  return new Game({ topic: topic, leader: userId })
    .save().then(() => {
      games.createChannel(game._id)
      return game
    })
    .catch(err => new BadRequest('could not create game'))
}

games.find = function (id) {
  if (!id) {
    return Promise.reject(new BadRequest('gameId is required'))
  }

  return Game.findOne({_id: id})
    .then(game => {
      if (!game) {
        return new games.NotFound(id)
      }
      return game
    })
}

games.joinGame = function (gameId, userId) {
  return games.find(gameId)
    .then(game => {
      if (!Object.keys(io.nsps).includes(gameId)) {
        createChannel(gameId)
      }
      if (!game.users.includes(userId)) {
        if (game.users.length < game.maxPlayers) {
          game.users.push(userId)
          return Game.update({_id: gameId}, { $push: { users: userId } })
            .then(() => game)
        }

        return new games.BadRequest(`game ${gameId} is full`)
      }
    })
}

games.createChannel = function (id) {
  var gameSocket = io.of(`/game_${id}`);

  gameSocket.on('connection', function (socket) {
    socket.use(function (socket, next) {
      games.find(id).then(game => {
        socket.game = game
        next()
      })
      .catch(() => next(new NotFound(id)))
    })

    socket.on('message', function (message) {
      // do nothing for invalid messages
      if (!message.text || message.text.length < 3 || !message.author ) {
        return
      }

      // max message length
      message.text = message.text.slice(0, 140)
      var game = socket.game

      if (game.users.includes(message.author)) {
        // message matches the phrase and the author isn't the leader
        if (cleanseString(message.text) === game.keyword && game.leader !== message.author) {
          // send a winning message
          return gameSocket.emit('message', {
            author: message.author,
            text: message.text,
            winning: true
          })
        }
        // if the leader sent the message
        if (game.leader === message.author) {
          // replace the keyword (if it's found) and send the message
          // to prevent cheating
          return gameSocket.emit('message', {
            author: message.author,
            text: message.text.replace(new RegExp(game.keyword, i), '****')
          })
        }

        // Wasn't the game leader and wasn't the correct phrase
        // so just send the message
        return gameSocket.emit('message', {
          author: message.author,
          text:message.text
        })
      }
      // user isn't playing in this game, ignore the message
    })

    socket.on('keyword', function (data) {
      if (!socket.request.user.facebookId !== socket.game.leader) {
        return socket.emit('error', new BadRequest('player is not the game leader'))
      }

      if (!data.keyword || data.keyword.length > 40) {
        return socket.emit('error', new BadRequest('keyword is required'))
      }

      var keyword = cleanseString(data.keyword)

      games.fetchGiphy(keyword)
        .then(src => {
          return socket.emit('roundStart', { image: src })
        })
        .catch(err => {
          return socket.emit('error', { reason: 'unknown api error' })
        })
    })
  })
}


games.NotFound = class NotFound extends Error {
  constructor(id) {
    super()
    this.statusCode = 404
    this.details = { reason: `game ${id} not found` }
  }
}

games.BadRequest = class BadRequest extends Error {
  constructor(reason) {
    super()
    this.statusCode = 400
    this.details = { reason: reason }
  }
}

function cleanseString (string) {
  return string.replace(/\s+/g, ' ').trim().toLowerCase();
}
