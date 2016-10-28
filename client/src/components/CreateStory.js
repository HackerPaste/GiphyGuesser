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
          <input className="createStoryInput createTitleInput" id="createTitle" type="text" placeholder="Giphy Title" />
        </div>

        <div className='createButtonWrap'>
          <input type="submit" value="START" />
        </div>
      </form>

    </div>
  )
}
