const path = require('path')
const router = require('express').Router()
const games = require('../controllers/gameController')
const User = require('../models/user')

isAuthed = (req,res,next) => {
  if(req.isAuthenticated()){
    return next()
  }
  console.log(req.isAuthenticated())
}

//Connect controller methods to their corresponding routes
router.get('/games', isAuthed, function (req, res) {
  games.findAll()
    .then(respond(res))
    .catch(respond(res))
})

router.post('/games', isAuthed, function (req, res) {
  console.log('create game req.body', req.body, req.user)
  games.create(req.body.topic, req.user.facebookId)
    .then(respond(res, 201))
    // .catch(respond(res))
})

router.get('/games/:gameId', function (req, res) {
  games.find(req.params.gameId)
    .then(respond(res))
    // .catch(respond(res))
})

router.put('/games/:gameId', function (req, res) {
  games.joinGame(req.params.gameId, req.user._id)
    .then(respond(res))
    // .catch(respond(res))
})

router.get('/user', isAuthed, function(req, res) {
  res.json(req.user)
})


function respond (res, status = 200) {
  return function(err) {
    if (err instanceof Error) {
      res.status(err.status || 500)
      return res.json(err.details)
    }
    res.status(status).json(err)
  }
}

module.exports = router
