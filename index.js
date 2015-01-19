var fs = require('fs');
var five = require('johnny-five');
var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var bot = require('./api/bot');

app.use(bodyParser());

app.get('/', function (req, res, next) {
  res.sendFile('index.html', {
    root: '.',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  })
})

app.use('/bot', bot());

app.listen(3000);
