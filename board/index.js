var five = require('johnny-five');

function connect() {
  var board = new five.Board();

  board.on('ready', function () {



  });

  board.on('error', function (err) {
    console.log(err)
  });

  return board;
}


module.exports = function () {
  return exports._io || (exports._io = exports.io())
}

exports.io = connect;
