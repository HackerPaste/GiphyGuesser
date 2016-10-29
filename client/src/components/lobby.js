var React = require('react')
var io = require('socket.io-client')
var Accordion = require('./accordion')
var GamesList = require ('./gamesList.js')
var API = require('../lib/api')

module.exports = class Lobby extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      games : [],
      displayComplete: false,
      socket: io()
    }
  }

  componentDidMount () {
    API.getGames()
      .then(data => {
        this.setState({games: data})
      })
      .catch(err => {
        console.log("ERROR getGames API call failed: ", err)
      })

    this.state.socket.on('gameCreated', game => {
      var games = this.state.games.slice()
      games.push(game)
      this.setState({ games: games })
    })
  }

  render () {
    // console.log("lobby.js this.state.games: ", this.state.games)
    return (
      <div>
        <GamesList gamesGoing={this.state.games} />
        <Accordion />
      </div>

    )
  }
}
