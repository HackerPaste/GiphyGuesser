var React = require('react');
var CreateStory = require('./CreateStory');
var StartButton = require ('./startButton.js')



module.exports = class Accordion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      gameTopic: ''
    }

    this.toggle = this.toggle.bind(this)
    this.handleGameCreateSubmit = this.handleMessageSubmit.bind(this);
  }

  toggle() {
    this.setState({active: !this.state.active})
  }

  handleGameCreateSubmit(event) {
    event.preventDefault()
    API.createGame(this.state.gameTopic)
  }

  handleGameCreateInput(event) {
    this.setState({gameTopic: event.target.value});
  }

  render() {
    const buttonText = this.state.active ? 'Hide' : '+ Create a Game'
    const sliderClass = this.state.active ? "show" : "hide"

    return (
      <div className="accordianSide">
        <div className="toggleButtonWrap">
          <button className="standardButton whiteButton" onClick={this.toggle}>{buttonText}</button>

        </div>
        <div className={sliderClass}>
          <div className="createStoryWrap">

            <form onSubmit={this.handleGameCreateSubmit}>
              <div>
                <input className="createStoryInput createTitleInput" id="createTitle" type="text" placeholder="Giphy Title" onChange={this.handleGameCreateInput}/>
              </div>

              <div className='createButtonWrap'>
                <input type="submit" value="START" />
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}
