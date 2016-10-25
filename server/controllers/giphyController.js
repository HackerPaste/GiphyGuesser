var axios = require('axios')

module.exports = {

  gifGet: (req,res) => {
    var keyword = req.body.keyword
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=dc6zaTOxFJmzC`)
      .then(function(result) {
        res.send(result.data.data[0].embed_url)
      })
      .catch(function(err) {
        console.log("ERRRRRRRROOOORRRRRRRRR in server/controllers/giphyController.js")
      })
  }

};
