if (!process.env.DBPATH) {
  require('dotenv').config();
}
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const session = require('express-session')
const path = require('path')
const morgan = require('morgan')
const browserify = require('browserify-middleware')
const LESS = require('node-less-endpoint')

const router = require('./routes/routes')
const User = require('./models/user')
const stories = require('./controllers/storyController')
const charles = require('./secretsecrets')

const port = process.env.PORT || 4000
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

passport.serializeUser(function (user, done) {
  console.log(user)
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null,obj)
})

passport.use(new FacebookStrategy({
    clientID          : charles.appId,
    clientSecret      : charles.appSecret,
    callbackURL       : "/auth/facebook/return",
    passReqToCallback : true,

  }, function(req, token, refreshToken, profile, done) {
    console.log('refreshToken:',refreshToken)
    var query = {
      'facebookId': profile.id
    };

    User.findOne(query).then(user => {
      if (user) {
        console.log('User found')
        done(null, user)
      } else {
        console.log('User not found - adding to DB')
        var newUser = {}
        newUser.facebookId = profile.id
        newUser.name = profile.displayName
        newUser.profilePic = `http://graph.facebook.com/${profile.id}/picture?width=400&height=400`
        newUser.token = token
        new User(newUser).save((err,user) => {
          if(err){
            console.log(err)
          }
          done(null, user)
        })
      }
    }).catch(err => {
      throw err
    })
  }
))

// app level middleware
app.use(morgan('dev'))

app.get('/bundle.js', browserify('./client/index.js', {
  debug: true,
  transform: [
    ['babelify', { presets: ['es2015', 'react'] }]
  ]
}));

app.get('/style.css', LESS.serve('./client/less/index.less', {
  debug: true,
  watchDir: './client/less'
}));

app.use(express.static(path.resolve(__dirname, '..client/public')))

app.use(bodyParser.json());
app.use(session({
  secret: charles.secret,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req,res) => {
  req.logout()
  res.redirect('/')
})
app.get('/auth/facebook', passport.authenticate('facebook'))
// facebook will call this URL
app.get('/auth/facebook/return', passport.authenticate('facebook', {
  failureRedirect: '/#/fail',
  successRedirect: '/#/',
}))

app.use('/api', router)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})



server.listen(port)

console.log(`Server is running on port: ${port}`)
