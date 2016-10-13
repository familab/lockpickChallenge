var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var gpio = require('./gpio');
var db = require('./db');

var gpioConfig = {
  pollInterval: 100, //ms
  pins: {
    3: {
      name: 'emergencyButton',
      state: null,
      interval: false
    },
    5: {
      name: 'startButton',
      state: null,
      interval: false
    },
    11: {
      name: 'door1',
      state: null,
      interval: false
    },
    13: {
      name: 'door2',
      state: null,
      interval: false
    },
    15: {
      name: 'door3',
      state: null,
      interval: false
    }
  }
}

app.use(express.static('public'));
db(app, io);
routes(io, gpioConfig);

server.listen(8080);
