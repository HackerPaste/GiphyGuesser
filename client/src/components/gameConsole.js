var React = require('react')

module.exports = (gif) => (
  <div>
    <div className="screenWrap">
      <img src={props.props.gif} alt="Mountain View" height="290" width="500"/>
      <form className="subjectDisplay">
        <input className="gameTextInput createTitleInput subjectinput" placeholder="Enter Giphy" type="text" name="guess"/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
    <Chat props={this.props} />
  </div>
)




// const Guess = (props) =>  {
//   return (
//         <form >
//           <input className="gameTextInput createTitleInput guessinput" placeholder="Guess Away!" type="text" name="guess"/>
//           <input type="submit" value="Submit"/>
//         </form>
//     )
// }
