var React = require('react')

module.exports = (props) => {
  return (
    <a onClick={props.logout} href="/logout" className="standardButton blackButton">
      Logout
    </a>
  )
}
