const stories = require('../controllers/storyController')
const users = require('../controllers/userController')
const router = require('express').Router()
const path = require('path')
const passport = require('passport')

isAuthed = (req,res,next) => {
  if(req.isAuthenticated()){
    return next()
  }
  console.log(req.isAuthenticated())
}

//Connect controller methods to their corresponding routes
router.route('/stories').get(stories.getAllStories)
router.route('/user').get(isAuthed, users.get)
router.route('/stories/:id').get(isAuthed, stories.joinStory, stories.getOneStory)
router.route('/stories').post(isAuthed,stories.createStory)
router.route('/stories/:id').put(stories.createNewLine)

module.exports = router
