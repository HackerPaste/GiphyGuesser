var React = require('react')
var io = require('socket.io-client')
var Chat = require('./chatService')

var API = require('../lib/api')

const socket = io()

class Game extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			currentUser: this.props.user //Double-check, should be object for picture and name
		}
	}

	render(){
	  // var dumpydata = [
    //   {image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvbGtDqWMwAi2ZEzqTBl7YkGSw3Gg0s5DO-96hXl-TbQeoOy07ow",
    //    title: "Sally Samwich",
    //    text: "It's a foot?"
  	//   },
  	//   {image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTCHJsXr71fGrlEHCIrQWOv9PVwUwcYQ_1sCa2zTu1kyQRtLfsg_g",
    //    title: "Gassy Gregor",
    //    text: "Dog Kissing?"
  	//   },
  	//   {image: "http://coolwhatsappdp.in/wp-content/uploads/2016/07/best-girls-dp-for-whatsapp-facebook-profile-pic-1-min-234x300.jpg",
    //    title: "Sister Mgcoo",
    //    text: "I'm voting for!"
  	//   },
  	//   {image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvbGtDqWMwAi2ZEzqTBl7YkGSw3Gg0s5DO-96hXl-TbQeoOy07ow",
    //    title: "Sally Samwich",
    //    text: "It's a foot?"
  	//   },
    //   ];

		// var dumps = dumpydata.map(function(dump){
  	// 	return <FeedItems pic={dump.image} tite={dump.title} txt={dump.text} />
  	// })

		return(
			<div>
        <div className="screenWrap">
				  <img src="http://i.giphy.com/KAhqdjgzVptM4.gif" alt="Mountain View" height="290" width="500"/>
          <Subject />
        </div>

        /*<div className="guessWrap">
				  <div className="guessFeed">
				    {dumps}
				  </div>
				  <Guess />
        </div>*/

			</div>
		)

	}
}

const FeedItems = (props) => {
  return (
  	<div className="guessEntry">
        <img className="feedImages" src={props.pic} alt="Smiley face" height="38" width="38"/>
		<span className="feedTextTitle">{props.tite}</span>
		<span className="feedText">{props.txt}</span>
    </div>
  	)
}

const Subject = (props) =>  {
  return (
        <form className="subjectDisplay">
          <input className="gameTextInput createTitleInput subjectinput" placeholder="Enter Giphy" type="text" name="guess"/>
          <input type="submit" value="Submit"/>
        </form>
    )
}

const Guess = (props) =>  {
  return (
        <form >
          <input className="gameTextInput createTitleInput guessinput" placeholder="Guess Away!" type="text" name="guess"/>
          <input type="submit" value="Submit"/>
        </form>
    )
}

module.exports = Game
