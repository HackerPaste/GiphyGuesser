import React from 'react'

const OpenStory = (props) => {
  return (
    <div className="openStoryWrap">
      <div className="openStoryTitle">{props.story.title}</div>
      <div className="openStoryUsers">{props.story.users.length}/{props.story.numberUsers}</div>
      <button className="joinButton">Join</button>
    </div>
  )
}

export default OpenStory