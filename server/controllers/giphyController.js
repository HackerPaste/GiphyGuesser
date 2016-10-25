var axios = require('axios')

module.exports = {

  gifGet: (req,res) => {
    var keyword = req.body
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=dc6zaTOxFJmzC`)
      .then(function(res) {
        return res.body[data][0][embed_url]
      })
      .catch(function(err) {
        console.log("ERRRRRRRROOOORRRRRRRRR in server/controllers/giphyController.js")
      })
  }

};
