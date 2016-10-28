var React = require('react')

var Accordion = require('./accordion')
var GamesList = require ('./games.js')
var API = require('../lib/api')

module.exports = class Lobby extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      games : [],
      displayComplete: false,

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
  }

  render () {
    return (
      <div>
        <GamesList gamesGoing={this.state.games} />
        <Accordion />
      </div>

    )
  }
}
