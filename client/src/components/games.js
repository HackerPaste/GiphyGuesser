var React = require('react')
var io = require('socket.io-client')

var API = require('../lib/api')

module.exports = class GameBoard extends React.Component {
	constructor(props){
		super(props)

    this.state = {
      gameTopic: '',

    }

    this.handleGameCreateSubmit = this.handleMessageSubmit.bind(this);
	}

  componentDidMount () {

  }

  render(){
  	return(
    <div className="gamesWrap">
	      <div className="gameInProgress">
	      	<ul>
	      		{
              this.props.gamesGoing.map(game => {
                return <GameOn data={game.title} pic={game.pic} />
              })
            }
	      	</ul>
	      </div>
	    </div>
    )
  }

}

const GameOn = (props) => {
  return (
    <li>
    	<div className="lobbyFeedcontainer">
        <img className="lobbyFeedImages" src={props.pic} alt="Smiley face" height="170" width="280"/>
    		<div className="lobbyFeedInfo">
        <p className="gameFeedTitles">
    			{props.data}
    		</p>
        </div>
    	</div>
    </li>
  )
}
