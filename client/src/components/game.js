var React = require('react')

class Game extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
	  var dumpydata = [
      {image: "https://media.giphy.com/media/l0MYGincUBB71ogY8/giphy.gif",
       title: "Sally Samwich",
       text: "It's a foot?"
  	  },
  	  {image: "https://media.giphy.com/media/l0MYGincUBB71ogY8/giphy.gif",
       title: "Gassy Gregor",
       text: "Dog Kissing?"
  	  }
      ];
		var dumps = dumpydata.map(function(dump){
  		return <FeedItems pic={dump.image} tite={dump.title} txt={dump.text} />
  	})
		return(
	
			<div>
				<img src="https://media.giphy.com/media/26hirPEihrhzOXIUo/giphy.gif" alt="Mountain View"/>

				{dumps}

				<form>
					<input className="gameTextInput createTitleInput guessinput" placeholder="Guess Away!" type="text" name="guess"/>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		)
	}
}

const FeedItems = (props) => {
  return (
  	<div className="guessFeed">
        <img className="feedImages" src={props.pic} alt="Smiley face" height="42" width="42"/>
		<span className="feedTextTitle">{props.tite}</span>
		<span className="feedText">{props.txt}</span>
    </div>
  	)
}



module.exports = Game