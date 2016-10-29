const socketio = require('socket.io')
module.exports.listen = function(http){
  var io = socketio.listen(http)
  module.exports.io = io;
  //establish socket connection
  io.on('connection', function(client){
    console.log("socket running")
  })
  return io
}
