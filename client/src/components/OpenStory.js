var React = require('react')
var { Router, Route, Link, IndexRoute, hashHistory, browserHistory } = require('react-router')
var API = require('../lib/api')

module.exports = (props) => {

  const storyURL = `/stories/${props.story._id}`



  const joinStory = () => {
    window.location = `/#${storyURL}`
  }

  return (
    <div className="openStoryWrap">
      <div className="openStoryTitle">{props.story.title}</div>
      <div className="openStoryUsers">{props.story.users.length}/{props.story.numberUsers}</div>
      <div className='openStoryJoinWrap'>
        <button onClick={joinStory} className="standardButton blackButton">Join</button>
      </div>
    </div>
  )
}
