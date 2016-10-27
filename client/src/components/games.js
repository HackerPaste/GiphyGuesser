var React = require('react')

 class GameBoard extends React.Component {
	constructor(props){
		super()
	}
  render(){
  	let rows = this.props.gamesGoing.map(game => {
  		return <GameOn data={game.title} num={game.players} pic={game.pic} />
  	})
  	return(
    <div className="gamesWrap">
	      <div className="gameInProgress">
	      	<ul>
	      		{rows}
	      	</ul>
	      </div>
	    </div>
    )
  }

}

const GameOn = (props) => {
  return (
    <li>
    	<div>
        <img className="feedImages" src={props.pic} alt="Smiley face" height="50" width="70"/>
    		<p >
    			{props.data}
    		</p>
    		<p className="feedPlayerNums">Players: {props.num}</p>
    	</div>

    </li>

  )
}

module.exports = GameBoard





