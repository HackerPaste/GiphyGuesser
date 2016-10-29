var axios = require('axios')
var io = require('../socket').io
const Game = require('../models/game')

var giphy = axios.create({ baseURL: 'http://api.giphy.com/v1/gifs' });
const games = module.exports

games.fetchGiphy = function (keyword) {
  return giphy.get(`/random?tag=${keyword}&lang=en&api_key=${process.env.GIPHY_KEY || 'dc6zaTOxFJmzC'}`)
    .then(res => res.data.data)
}

games.create = function (topic, userId) {
  if (!topic || !userId) {
    return Promise.reject(new games.BadRequest('topic and userId are required'))
  }
  return new Game({ topic: topic, leader: userId })
    .save().then((game) => {
      games.createChannel(game._id)
      io.emit('gameCreated', game)
      return game
    })
    // .catch(err => {
    //   throw new games.BadRequest('could not create game')
    // })
}

games.findAll = function () {
  return Game.find({}).populate('users', 'facebookId')
}

games.find = function (id) {
  if (!id) {
    return Promise.reject(new games.BadRequest('gameId is required'))
  }

  return Game.findOne({_id: id}).populate('users')
    .then(game => {
      if (!game) {
        throw new games.NotFound(id)
      }
      return game
    })
}

games.joinGame = function (gameId, user) {
  return Game.findOne({ _id: gameId }).populate('users')
    .then(game => {
      var socket
      if (!Object.keys(io.nsps).includes(`/game_${gameId}`)) {
        socket = games.createChannel(gameId)
      } else {
        socket = io.of(`/game_${gameId}`);
      }
      if (!game.users.map(user => user.facebookId).includes(user.facebookId)) {
        game.users.push(user)
        return Game.update({_id: gameId}, { $push: { users: user._id } })
          .then(() => {
            socket.emit('playerJoined', user)
            return game
          })
        throw new games.BadRequest(`game ${gameId} is full`)
      }
    })
    .catch(function(err) {
      console.log(err)
    })
}

games.createChannel = function (id) {
  var gameSocket = io.of(`/game_${id}`)

  gameSocket.use(function (socket, next) {
    Game.findOne({_id: id}).populate('users')
      .then(game => {
        if (game) {
          socket.game = game
          next()
        } else {
          throw new games.NotFound(id)
        }
      })
      .catch(console.error)
  })
  gameSocket.on('connection', function (socket) {
    console.log(`new connection on channel '/game_${id}'`)
    var keyword

    socket.on('keyword', function (data) {
      console.log('User: ', socket.request.user)
      console.log('Leader: ', socket.game.leader)
      if (socket.request.user.facebookId != socket.game.leader) {
        console.log('got keyword from non-leader', data)
        return gameSocket.emit('error', new games.BadRequest('player is not the game leader'))
      }

      if (!data.keyword || data.keyword.length > 40) {
        console.log('keyword invalid')
        return gameSocket.emit('error', new games.BadRequest('keyword is required'))
      }

      keyword = cleanseString(data.keyword)

      games.fetchGiphy(keyword)
        .then(image => {
          console.log('fetched giphy')
          return gameSocket.emit('roundStart', { image: image.image_url })
        })
        // .catch(err => {
        //   console.log('failed getting giphy', err)
        //   return gameSocket.emit('error', { reason: 'unknown api error' })
        // })
    })

    socket.on('message', function (message) {
      // do nothing for invalid messages
      // console.log("message received: ", message)
      if (!message.text || message.text.length < 3 || !message.author ) {
        return
      }

      // max message length
      message.text = message.text.slice(0, 140)
      var game = socket.game

      // console.log("game.users.map(user => user.facebookId).includes(message.author): ", game.users.map(user => user.facebookId).includes(message.author))
      // console.log("game.users: ", game.users, "message.author: ", message.author)
      // console.log("game: ", game)
      if (game.users.map(user => user.facebookId).includes(message.author)) {
        // message matches the phrase and the author isn't the leader
        // console.log("cleanseString(message.text) === game.keyword: ", cleanseString(message.text) === game.keyword)
        console.log("cleanseString(message.text) === keyword, ", cleanseString(message.text) === keyword)
        if (cleanseString(message.text) === keyword ) { //I took this part out for the demonstration: && game.leader !== message.author
          // send a winning message
          console.log("WINNER WINNER CHICKEN DINNER")
          return gameSocket.emit('roundEnd', {
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
      if (socket.request.user.facebookId != socket.game.leader) {
        console.log('got keyword from non-leader', data)
        return gameSocket.emit('error', new games.BadRequest('player is not the game leader'))
      }

      if (!data.keyword || data.keyword.length > 40) {
        console.log('keyword invalid')
        return gameSocket.emit('error', new games.BadRequest('keyword is required'))
      }

      var keyword = cleanseString(data.keyword)
      socket.game.keyword = keyword
      socket.game.save()
      games.fetchGiphy(keyword)
        .then(image => {
          console.log('fetched giphy')
          return gameSocket.emit('roundStart', { image: image.image_url })
        })
        // .catch(err => {
        //   console.log('failed getting giphy', err)
        //   return gameSocket.emit('error', { reason: 'unknown api error' })
        // })
    })
  })
  return gameSocket
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

// force sockets to be created for any existing games on server start
Game.find().then(res => {
  res.forEach(game => games.createChannel(game._id))
})
