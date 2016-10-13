var db = require('./db').db;
var gpioConfig = null;

module.exports = function(io, gpio) {
  gpioConfig = gpio;

  io.on('connection', function(socket) {
    socket.emit('updatePeople');
    socket.emit('updateScores');
    Object.keys(gpioConfig.pins).forEach(function(pin) {
      var config = gpioConfig.pins[pin];
      socket.emit(config.name, config.state == true);
    });

    socket.on('getPeople', function() {
      db.all("SELECT * FROM people", function(err, data) {
        socket.emit('people', data.map(function(row) {
          return {
            id: row.id,
            name: row.name
          }
        }));
      });
    });

    socket.on('getScores', function() {
      db.all("SELECT * FROM score", function(err, data) {
        socket.emit('scores', data);
      });
    });
  });
}
