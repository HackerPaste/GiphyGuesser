var React = require('react')
var Login = require('./login')

module.exports = (props) => {
  return (
    <div className="navbarWrap">
      <div className="headerLogo">
        <a href="/"><h1>Line4Line</h1></a>
      </div>
      <div className="headerLogButton">
        <Login
          logout={props.logout}
          currentUser={props.currentUser}
        />
      </div>
    </div>
  )
}
