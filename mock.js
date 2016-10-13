var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var repl = require('repl');
var readline = require('readline');
var routes = require('./routes');
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


server.listen(8080);

app.use(express.static('public'));
db(app, io);
routes(io, gpioConfig);

var replServer = repl.start({
  prompt: '> ',
  input: process.stdin,
  output: process.stdout,
  completer: function(line) {
    var completions = [
      '.help',
      '.exit'
    ].concat(Object.keys(gpioConfig.pins).map(function(pin) {
      return '.toggle ' + gpioConfig.pins[pin].name;
    }));
    var hits = completions.filter((c) => { return c.indexOf(line) == 0 });
    // show all completions if none found
    return [hits.length ? hits : completions, line];
  }
});

replServer.defineCommand('toggle', {
  help: 'toggle gpio',
  action: function(name) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    var gpioNames = Object.keys(gpioConfig.pins).map(function(pin) {
      return gpioConfig.pins[pin].name;
    });
    var pin = Object.keys(gpioConfig.pins).filter(function(pin) {
      return gpioConfig.pins[pin].name == name;
    });
    var pin = pin.length > 0 ? pin[0] : false;
    if (gpioNames.includes(name) && pin) {
      gpioConfig.pins[pin].state = !gpioConfig.pins[pin].state;
      io.emit(gpioConfig.pins[pin].name, gpioConfig.pins[pin].state);
      console.log(`${name} = ${gpioConfig.pins[pin].state}`);
    } else {
      console.error('invalid pin, try one of: ' + gpioNames.join(', '));
    }
    this.displayPrompt();
  }
});

replServer.defineCommand('exit', {
  help: 'Exit the repl',
  action: function(name) {
    server.close();
    this.close();
  }
});
