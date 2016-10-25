var http = require('axios');
var API = module.exports;

API.getUser = function () {
  return http.get('/api/user')
    .then(res => res.data)
}

API.createStory = function (story) {
  return http.post('/api/stories', story)
    .then(res => res.data)
}

API.getStories = function() {
  return http.get('/api/stories')
    .then(res => res.data)
}

API.getStory = function(storyId) {
  return http.get(`/api/stories/${storyId}`)
    .then(res => res.data)
}
