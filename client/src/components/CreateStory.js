var React = require('react')
var API = require('../lib/api')
module.exports = (props) => {

  const createStory = (e) => {
    // REFACTOR IF WE HAVE TIME.
    e.preventDefault()
    const newStory = {}
    newStory.title = document.getElementById('createTitle').value
    newStory.numberUsers = document.getElementById('createNUsers').value

    API.createStory(newStory)
      .then(res => window.location = res.redirect)
  }

  return (
    <div className="createStoryWrap">

      <form onSubmit={createStory}>
        <div>
          <input className="createStoryInput createTitleInput" id="createTitle" type="text" placeholder="The Tale of the..." />
        </div>
        <div>
          <h3>Number of users</h3>
          <input className="createStoryInput createNumberInput" id="createNUsers" type="number" min="1" max="10" placeholder="5"/>
        </div>
        <div className='createButtonWrap'>
          <input className="standardButton blackButton" type="submit" value="Create" />
        </div>
      </form>
    </div>
  )
}
