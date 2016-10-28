var React = require('react')

module.exports = class Game extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      userName: props.user,
      socket: props.socket, //Should be passed in from game.js
      gif: props.gif
    }
  }

  componentDidMount () {
  }

  render(){
    return(
      <div>
        <div className="screenWrap">

          <img src="http://i.giphy.com/KAhqdjgzVptM4.gif" alt="Mountain View" height="290" width="500"/>
          <Subject />

        </div>

        <Chat props={this.props} />

      </div>
    )

  }
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
