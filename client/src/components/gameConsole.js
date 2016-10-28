var React = require('react')

module.exports = (gif) => (
  <div>
    <div className="screenWrap">
      <img src={props.props.gif} alt="Mountain View" height="290" width="500"/>
      <form className="subjectDisplay">
        <input className="gameTextInput createTitleInput subjectinput" placeholder="Enter Giphy" type="text" name="guess" onChange={props.handleKeywordInput}/>
        <input type="submit" value="Submit" onClick={props.handleKeywordSubmit}/>
      </form>
    </div>
  </div>
)

