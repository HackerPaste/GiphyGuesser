var React = require('react');
var ReactDOM = require('react-dom');

module.exports = props => (
  <div class="chatDisplay">
      <ul class="chatDisplayList">
        {
          props.m(prop => {
            <li>
          })
        }
      </ul>
  </div>
)
