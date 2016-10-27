var axios = require('axios')
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
    .save().then(() => game)
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

games.NotFound = class NotFound extends Error {
  constructor(id) {
    super()
    this.statusCode = 404
    this.details = { reason: `game ${id} not found` }
  }
}

games.BadRequest = class BadRequest extends Error {
  consctructor(reason) {
    super()
    this.statusCode = 400
    this.details = { reason: reason }
  }
}
