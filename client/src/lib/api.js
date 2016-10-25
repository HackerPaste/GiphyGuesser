var http = require('axios');
var API = module.exports;

API.getUser = function () {
  return http.get('/api/user')
    .then(res => res.data)
}
