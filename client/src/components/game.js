var React = require('react')
var io = require('socket.io-client')
var Chat = require('./chatService')
var GameConsole = require('./gameConsole')

var API = require('../lib/api')

module.exports = class Game extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      socket: io.connect(`/game_${props.game_id}`),
      game: '', //Set in componentDidMount getGame
      gameLeader: {}, //Set in componentDidMount newRound //Send to gameConsole for display
      gif: '', //Set in componentDidMount roundStart //Send to gameConsole for display
      gameOver: {}, //Set in componentDidMount //Send to gameConsole for display
      messageSend: '',
      messageRec: [],
      users: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    API.getGame(this.props.game_id)
      .then(function(game) {
        this.setState({game: game})
      })

    this.state.socket.on('newRound', function(data) {
      this.setState({gameLeader: data})
    })

    this.state.socket.on('roundStart', function(data) {
      this.setState({gif: data})
    })

    this.state.socket.on('roundEnd', function(data) {
      this.setState({gameOver: data})
    })

    this.state.socket.on('playerJoined', function(data) {
      this.setState({playerJoined: data})
    })

    this.state.socket.on('playerLeft', function(data) {
      this.setState({playerLeft: data})
    })

    this.state.socket.on('message', function(data) {
      var message = this.state.messageRec.slice()
      message.push(data)
      this.setState({messageRec: message})
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.state.socket.emit('message', {author: props.user.facebookId, text: this.state.messageSend})
  }

  handleMessageInput(event) {
    this.setState({messageSend: event.target.value});
  }

  render(){
    return(
      <div>
        <GameConsole gif={this.state.gif} />
        <Chat users={this.state.users} messageRec={this.state.messageRec} />
      </div>
    )

  }
}
