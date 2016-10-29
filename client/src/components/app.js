var React = require('react')
var { Router, Route, Link, IndexRoute, browserHistory } = require('react-router')
var Lobby = require('./lobby')
var Game = require('./game')
var NavBar = require('./NavBar')
var API = require('../lib/api')

module.exports = class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: false
    }
    //Bind this to logout so it can be passed down through multiple components
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    //Make an initial get request to sign the user in with Facebook
    //This current user will be used in many places throughout the app.
    API.getUser()
    .then(user => {
      this.setState({
        currentUser: user
      })
    })
  }

  logout () {
    this.setState({
      currentUser: false
    })
  }

  render () {

    return (
      <div>
        <NavBar
          logout={this.logout}
          currentUser={this.state.currentUser}
        />


        {
          //if there is a current user, render the lobby/story with react router
          //else tell the user to login
          this.state.currentUser ?
            <Router history={browserHistory}>
              <Route path='/' component={Lobby} user={this.state.currentUser}/>
              <Route path='/game/:gameId' user={this.state.currentUser} component={Game} />
            </Router>
          :
          <div>Please Login</div>
        }


      </div>
    )
  }
}
