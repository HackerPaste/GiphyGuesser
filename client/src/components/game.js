const socket = io()

var React = require('react')
var io = require('socket.io-client')
var Chat = require('./chatService')
var GameConsole = require('./gameConsole')

var API = require('../lib/api')

module.exports = class Game extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			currentUser: props.user, //Double-check, should be object for picture and name
			socket: io.connect(`/game_${props.game_id}`),
			game: '', //Set in componentDidMount getGame
			gameLeader: {}, //Set in componentDidMount newRound //Send to gameConsole for display
			gif: '', //Set in componentDidMount roundStart //Send to gameConsole for display
			gameOver: {}, //Set in componentDidMount //Send to gameConsole for display
			playerJoined: {}, //Set in componentDidMount //Send to chatService for display
			playerLeft: {}, //Set in componentDidMount //Send to chatService for display
		}
	}

	componentDidMount () {
    API.getGame(this.props.game_id)
      .then(function(game) {
        this.setState({game: game})
      })

    socket.on('newRound', function(data) {
      this.setState({gameLeader: data})
    })

		socket.on('roundStart', function(data) {
      this.setState({gif: data})
    })

		socket.on('roundEnd', function(data) {
			this.setState({gameOver: data})
		})

		socket.on('playerJoined', function(data) {
			this.setState({playerJoined: data})
		})

		socket.on('playerLeft', function(data) {
			this.setState({playerLeft: data})
		})
  }

	render(){
		return(
			<div>
        // <GameConsole props={this.props} />
        <Chat props={this.props} />
			</div>
		)

	}
}
