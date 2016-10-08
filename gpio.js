var gpio = require('pi-gpio');

module.exports = function(pin, interval, pollInterval, state, name, io) {
  gpio.open(pin, "input pullup", function(err) {
    if (err) {
      // console.log(err); // Already open
    }

    interval = setInterval(function() {
      gpio.read(pin, function(err, value) {
        if (err) {
          return console.log(err);
        }
        if (state.pins[pin].state !== value) {
          state.pins[pin].state = value;
          console.log(name, value == true);
          io.emit(name, value == true);
        }
      });
    }, pollInterval);
  });
};
