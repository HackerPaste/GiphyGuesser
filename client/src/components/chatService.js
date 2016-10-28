var React = require('react')

module.exports = (props) => (
  <div class="container">
    <div className="guessWrap">
      <div className="guessFeed">
        {
          props.messageRec.map(message => {
            var user = props.users[message.author]
            return <ChatMessage image={user.profilePic} text={message.text} />
          })
        }
        <div id="chatControls">
          <input id="messageInput" type="text" onChange={props.handleMessageInput}/>
          <button id="submit" type="submit" onClick={props.handleSubmit}>Enter</button>
        </div>
      </div>
    </div>
  </div>
)

const ChatMessage = (props) => (
  <div className="guessEntry">
    <img className="feedImages" src={props.image} alt="Smiley face" height="38" width="38"/>
  <span className="feedText">{props.text}</span>
  </div>
)
