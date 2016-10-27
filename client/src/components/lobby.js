var React = require('react')
var OpenStory = require('./OpenStory')
var Accordion = require('./Accordion')
var GameBoard = require ('./games.js')
var API = require('../lib/api')
module.exports = class Lobby extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allStories: [],
      openStories: [],
      completeStories: [],
      displayComplete: false
    }
  this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  componentDidMount () {
    //get an array of all the stories from the db that need more users
    API.getStories()
      .then(stories => {
        console.log('Got stories: ', stories);
        let completeStories = stories.filter(story => story.complete)
        console.log('comstor: ',completeStories)
        let openStories = stories.filter(story => story.length > story.lines.length)
        console.log('openstor: ', openStories)
        this.setState({
          allStories: stories,
          openStories: openStories,
          completeStories: completeStories
        })
      })
  }

  toggleDisplay () {
    this.setState({
      displayComplete: !this.state.displayComplete
    })
  }

  render () {
    var dummydata = [
      {title: "Rolling Bones",
       players: 5,
       pic: "https://media.giphy.com/media/3orif3fITs4rQqSXN6/giphy.gif"
      },
      {title: "Cat Claws",
       players: 5,
       pic: "https://media.giphy.com/media/3o7TKMhrIzsI8eyxfa/giphy.gif"
      },
      {title: "Hair Lovers",
       players: 2,
       pic: "https://media.giphy.com/media/ayYTO2cun7TUs/giphy.gif"
      },
      {title: "Wreckers",
       players: 3,
       pic: "https://media.giphy.com/media/7gcZKX1Dlo3iE/giphy.gif"
      },
      {title: "Rolling Bones",
       players: 5,
       pic: "https://media.giphy.com/media/3orif3fITs4rQqSXN6/giphy.gif"
      },
      {title: "Cat Claws",
       players: 5,
       pic: "https://media.giphy.com/media/3o7TKMhrIzsI8eyxfa/giphy.gif"
      },

      ];
    var displayButtonText = this.state.displayComplete ? 'Show Open' : 'Show Complete'
    return (
      <div>
      <GameBoard gamesGoing={dummydata} />
        <Accordion />

        <div className='lobby'>
          <div className="lobbyLabels">
                    </div>
          { this.state.displayComplete ?

            this.state.completeStories.map((story, i) =>
              <OpenStory story={story} key={i} />
            )

            :

            this.state.openStories.map((story, i) =>
            <OpenStory story={story} key={i} />
            )

          }

        </div>
      </div>
    )
  }
}
