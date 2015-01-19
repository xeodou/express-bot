var express = require('express');
var five = require('johnny-five');
var board = new five.Board({
  repl: false
});

var tempSensor, adc, piezo;
board.on('ready', function () {
  console.log('ready')
  tempSensor = new five.Sensor('A0');
  piezo = new five.Piezo('9');
  tempSensor.on('read', function (err, value) {
    if (!isNaN(value)) {
      adc = value;
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
      data: celcius(adc)
    })
  });

  app.get('/mic', function (req, res, next) {
    piezo.note(five.Piezo.Notes['a4'], 200);
    res.json({});
  });

  return app;
}

function celcius(RawADC) {
  var _tpr = Math.log(10000.0 * ((1024.0 / RawADC - 1)));
  //         =log(10000.0/(1024.0/RawADC-1)) // for pull-up configuration
  _tpr = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * _tpr * _tpr)) * _tpr);
  // _tpr = _tpr - 273.15; // Convert Kelvin to Celcius
  // _tpr = (_tpr * 9.0) / 5.0 + 32.0; // Convert Celcius to Fahrenheit
  return (_tpr - 273.15).toFixed(2);
}
