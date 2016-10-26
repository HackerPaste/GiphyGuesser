var React = require('react')

 class GameBoard extends React.Component {
	constructor(props){
		super()
	}
  render(){
  	let rows = this.props.gamesGoing.map(game => {
  		return <GameOn data={game.title} num={game.players} />
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
    		<h3>
    			{props.data}
    		</h3>
    		<h4>Players: {props.num}</h4>
    	</div>

    </li>

  )
}

module.exports = GameBoard





