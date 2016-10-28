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

// TO DO 
// API.createGame = function (gameId) {
//   return http.post('/api/create', gameId)
//     .then(res => res.data)
// }
