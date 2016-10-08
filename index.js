var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var gpio = require('./gpio');

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

Object.keys(gpioConfig.pins).forEach(function(pin) {
  var config = gpioConfig.pins[pin];
  gpio(pin, config.interval, gpioConfig.pollInterval, gpioConfig, config.name, io);
});

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  Object.keys(gpioConfig.pins).forEach(function(pin) {
    var config = gpioConfig.pins[pin];
    socket.emit(config.name, config.state == true);
  });
});
