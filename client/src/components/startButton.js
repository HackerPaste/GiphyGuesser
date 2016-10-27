var React = require('react')

module.exports = (props) => {
  return (
    <a onClick={props.start} href="/game" className="standardButton startButton">
      Start Game!
    </a>
  )
}