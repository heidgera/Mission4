var exec = require('child_process').exec;
var rpio = require('rpio');

/* Configure P11 as an output pin, setting its initial state to low */

rpio.init({ mapping: 'physical' });

rpio.open(11, rpio.OUTPUT, rpio.LOW);
rpio.open(13, rpio.OUTPUT, rpio.LOW);
rpio.open(15, rpio.INPUT, rpio.PULL_DOWN);

rpio.open(18, rpio.OUTPUT, rpio.LOW);
rpio.open(16, rpio.INPUT, rpio.PULL_OFF);

function oldPollCB(pin) {
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

function newPollCB(pin) {
  if (!rpio.read(pin)) {
    console.log('power removed.');
    setTimeout(function() {
      exec('sudo shutdown now', function(err, out, sterr) {
        console.log(out);
      });
    }, 1000);
  }
}

rpio.poll(15, oldPollCB);
rpio.poll(16, newPollCB);

process.on('SIGINT', function() {
  rpio.close(11);
  rpio.close(13);
  rpio.close(15);
  rpio.close(18);
  rpio.close(16);
  process.exit(0);
});

exports.writeOutput = function(state) {
  rpio.write(13, (state) ? rpio.HIGH : rpio.LOW);
  rpio.write(18, (state) ? rpio.HIGH : rpio.LOW);
};
