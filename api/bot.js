var express = require('express');
var five = require('johnny-five');
var board = new five.Board({
  repl: false
});

var tempSensor, tpr, piezo;
board.on('ready', function () {
  console.log('ready')
  tempSensor = new five.Sensor('A0');
  piezo = new five.Piezo('9');
  tempSensor.on('read', function (err, value) {
    if (!isNaN(value)) {
      tpr = value;
    }
  })
})

board.on('error', function (err) {
  console.log(err)
})


module.exports = function () {
  var app = express.Router();

  app.get('/tpr', function (req, res, next) {
    var query = req.query;
    res.json({
      data: (100 * (tpr / 1000) - 50).toFixed(2)
    })
  });

  app.get('/mic', function (req, res, next) {
    piezo.note(five.Piezo.Notes['a4'], 200);
    res.json({});
  });

  return app;
}
