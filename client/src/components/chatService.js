const socket = io()

var React = require('react')
var io = require('socket.io-client')

var API = require('../lib/api')

module.exports = class Story extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      userName: props.user,
      socket: props.socket,
      game: props.game,
      messageSend: '',
      messageRec: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    socket.on('message', function(data) {
      var message = this.state.messageRec.slice()
      message.push(data)
      this.setState({messageRec: message})
    })
  }

  handleSubmit(event) {
    this.state.socket.emit('message', this.state.userName, this.state.messageSend)
  }

  handleMessageInput(event) {
    this.setState({messageSend: event.target.value});
  }



  render () {
    <div class="container">
      <div className="guessWrap">
        <div className="guessFeed">
          <ChatDisplay props={this.props}>
          <div id="chatControls">
            <input id="messageInput" type="text" onChange={this.handleMessageInput}/>
            <button id="submit" type="submit" onClick={this.handleSubmit}>Enter</button>
          </div>
        </div>
      </div>
    </div>
  }

}


var chatDisplay = dumpydata.map(function(dump){
	return <FeedItems pic={dump.image} tite={dump.title} txt={dump.text} />
})

const FeedItems = (props) => {
  return (
  	<div className="guessEntry">
        <img className="feedImages" src={props.pic} alt="Smiley face" height="38" width="38"/>
		<span className="feedTextTitle">{props.tite}</span>
		<span className="feedText">{props.txt}</span>
    </div>
  	)
}
