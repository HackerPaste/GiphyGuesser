var React = require('react')
var LoginButton = require('./LoginButton')
var LogoutButton = require('./LogoutButton')

module.exports = (props) => {
  let loginButton
    if (!props.currentUser) {
      loginButton = <LoginButton loginWithFacebook={props.loginWithFacebook} />
    } else {
      loginButton = <LogoutButton logout={props.logout} />
    }
  return (
    <div>
      {loginButton}
    </div>
  )
}
