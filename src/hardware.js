var exec = require('child_process').exec;
var rpio = require('rpio');

/* Configure P11 as an output pin, setting its initial state to low */
rpio.open(11, rpio.OUTPUT, rpio.LOW);
rpio.open(13, rpio.OUTPUT, rpio.LOW);
rpio.open(15, rpio.INPUT, rpio.PULL_DOWN);

function pollcb(pin) {
  if (!rpio.read(pin)) {
    console.log('power removed.');
    rpio.write(11, rpio.HIGH);
    setTimeout(function() {
      rpio.write(11, rpio.LOW);
      exec('sudo shutdown now', function(err, out, sterr) {
        console.log(out);
      });
    }, 1000);
  }
}

rpio.poll(15, pollcb);

process.on('SIGINT', function() {
  rpio.close(11);
  rpio.close(13);
  rpio.close(15);
  process.exit(0);
});

exports.writeOutput = function(state) {
  rpio.write(13, (state) ? rpio.HIGH : rpio.LOW);
};
