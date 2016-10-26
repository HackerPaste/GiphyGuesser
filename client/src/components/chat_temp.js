//temporary code for client side portion of chat service.
//Will likely need to be integrated
var React = require('react')
var io = require('socket.io-client')
var API = require('../lib/api')

const socket = io.connect()

module.exports = class Story extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount () {

  }

  addMessage (msg, alias) {

  }

  render () {
    <div class="message" id="chatEntries">
        <p>`${this.props.alias}:${this.props.msg}`</p>
    </div>
  }
}
