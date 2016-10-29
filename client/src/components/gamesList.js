var React = require('react')
var io = require('socket.io-client')
var {Link} = require('react-router')

var API = require('../lib/api')

module.exports = (props) => (
    <div className="gamesWrap">
      <div className="gameInProgress">
      	<ul>
      		{
              props.gamesGoing.map(game => {
              return <GameOn game={game} />
            })
          }
      	</ul>
      </div>
	  </div>
)

const GameOn = (props) => {
  return (
    <li>
    	<div className="lobbyFeedcontainer">
        <Link to={`/game/${props.game._id}`}>
          <img className="lobbyFeedImages" src={props.game.image} alt="Smiley face" height="170" width="280"/>
       </Link>
        <div className="lobbyFeedInfo">
        <p className="gameFeedTitles">
    			<Link to={`/game/${props.game._id}`}>{props.data}</Link>
    		</p>
        </div>
    	</div>
    </li>
  )
}
