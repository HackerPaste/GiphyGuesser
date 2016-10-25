var React = require('react')
var { Link } = require('react-router')


module.exports = (props) => {
  return (
    <a href="/auth/facebook" className="standardButton facebookButton">
      Login with Facebook
    </a>
  )
}
