  var React = require('react')
var io = require('socket.io-client')
var Chat = require('./chatService')
var GameConsole = require('./gameConsole')

var API = require('../lib/api')

module.exports = class Game extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      socket: io.connect(`/game_${this.props.params.gameId}`), //Should happen in games.js
      game: '',
      gameLeader: {},
      gif: '',
      gameOver: {},
      messageSend: '',
      messageRec: [],
      users: {},
      keyword: '',
      gameOverFlag: false
    }

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleKeywordSubmit = this.handleKeywordSubmit.bind(this);
    this.handleKeywordInput = this.handleKeywordInput.bind(this);
  }

  componentDidMount () {
    API.getGame(this.props.params.gameId)
      .then((game) => this.setState({game: game, gif: game.image}))

    this.state.socket.on('newRound', data => {
      console.log('newRound', data)
      this.setState({gameOverFlag: false})
      this.setState({gameLeader: data})
    })

    this.state.socket.on('roundStart', data => {
      console.log('roundStart', data)
      this.setState({gif: data.image})
    })

    this.state.socket.on('roundEnd', data => {
      console.log('roundEnd', data)
//Everyone gets the event, not everyone is winner - need logic for losers
      this.setState({gameOverFlag: true})
      this.setState({gameOver: data})
    })

    this.state.socket.on('playerJoined', data => {
      console.log('playerJoined', data)
      this.setState({playerJoined: data})
    })

    this.state.socket.on('playerLeft', data => {
      console.log('playerLeft', data)
      this.setState({playerLeft: data})
    })

    this.state.socket.on('message', data => {
      console.log('message', data)
      var message = this.state.messageRec.slice()
      message.push(data)
      this.setState({messageRec: message})
    })
  }

  handleMessageSubmit(event) {
    event.preventDefault()
    this.state.socket.emit('message', {author: props.user.facebookId, text: this.state.messageSend})
  }

  handleMessageInput(event) {
    this.setState({messageSend: event.target.value});
  }

   handleKeywordSubmit(event) {
    event.preventDefault()
    this.state.socket.emit('keyword', {keyword: this.state.keyword})
  }

  handleKeywordInput(event) {
    this.setState({keyword: event.target.value});
  }

  render() {
    return(
      <div>
        <GameConsole gif={this.state.gif} gameOver={this.state.gameOver} gameOverFlag={this.state.gameOverFlag} handleKeywordSubmit={this.handleKeywordSubmit} handleKeywordInput={this.handleKeywordInput}/>
        <Chat users={this.state.users} messageRec={this.state.messageRec} />
      </div>
    )

  }
}
