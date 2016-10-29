var http = require('axios');
var API = module.exports;

API.getUser = function () {
  return http.get('/api/user')
    .then(res => res.data)
}

API.getGames = function () {
  return http.get('/api/games')
    .then(res => res.data)
}

API.getGame = function (gameId) {
  return http.get(`/api/games/${gameId}`)
    .then(res => res.data)
}

API.createGame = function (topic) {
  return http.post('/api/games', {topic: topic})
    .then(res => res.data)
}
