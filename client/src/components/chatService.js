var React = require('react')
var io = require('socket.io-client')
var API = require('../lib/api')
var chatDisplay = require(./chatDisplay)

module.exports = class Story extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      alias: props.alias,
      socket: io.connect(`/game_${props.game_id}`),
      game: '',
      messageSend: '',
      messageRec: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    API.getGame(this.props.game_id)
      .then(function(game) {
        this.setState({game: game})
      })

    socket.on('message', function(data) {
      var message = this.state.messageRec.slice()
      message.push(data)
      this.setState({messageRec: message})
    })
  }

  handleSubmit(event) {
    this.state.socket.emit('message', this.state.alias, this.state.messageSend)
  }

  handleMessageInput(event) {
    this.setState({messageSend: event.target.value});
  }



  render () {
    <div class="container">
      <div className="guessWrap">
        <div className="guessFeed">
          <chatDisplay props={this.props}>
          <div id="chatControls">
            <input id="messageInput" type="text" onChange={this.handleMessageInput}/>
            <button id="submit" type="submit" onClick={this.handleSubmit}>Enter</button>
          </div>
        </div>
      </div>
    </div>
  }



      {dumps}

    <Guess />



}
