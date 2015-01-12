var fs = require('fs');
var five = require('johnny-five');
var express = require('express');
var app = express();

var on = false;

app.get('/', function (req, res, next) {
  res.sendFile('index.html', {
    root: '.',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  })
})

app.post('/bot', function (req, res, next) {
  light(function () {
    res.send({})
  })
})

function light(cb) {
  var myBoard = new five.Board();
  myBoard.on('ready', function () {
    var myLed = new five.Led(13)
    if (on) {
      myLed.strobe();
    } else {
      myLed.stop();
    }
    on = !on;
    // myLed.strobe(1000);
    // make myLED available as 'led' in REPL
    // try 'on', 'off', 'toggle', 'strobe', 'stop' (stops strobing)
    cb()
  });
}


app.listen(3000);
