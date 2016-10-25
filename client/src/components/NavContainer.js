var React = require('react')

module.exports = (props) => {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  )
}
