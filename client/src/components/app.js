import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Lobby from './Lobby'
import Story from './Story'
import Login from './Login'
import CreateStory from './CreateStory'
import NavBar from './NavBar'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: false
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    $.get('http://localhost:8081/user')
    .then(user => {
      this.setState({
        currentUser: user
      })
    })
    .catch(err => {
      console.log('No user is signed in: ', err)
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
        this.state.currentUser ? 
        <Router history={hashHistory}>
          <Route path='/' component={Lobby} />
          <Route path='/stories/:id' component={Story} user={this.state.currentUser} />
        </Router> 
        : 
        <div>Please Login</div>
        }
      </div>
    )
  }
}

export default App
