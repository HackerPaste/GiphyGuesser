var React = require('react')

module.exports = (props) => (
  <div>
    <div className="screenWrap">
      <img src={props.gif} alt="Mountain View" height="290" width="500"/>
      <div>
        <div>{props.gameOverFlag}The Winner is {props.gameOver.winner}!!!</div>
        <div>{props.gameOverFlag}The winning phrase was {props.gameOver.winningPhrase}</div>

        <form className="subjectDisplay" onSubmit={props.handleKeywordSubmit}>
          <input className="gameTextInput createTitleInput subjectinput" placeholder="Enter Giphy" type="text" name="guess" onChange={props.handleKeywordInput}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  </div>
)
