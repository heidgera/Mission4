'use strict';

console.log('here we go');

require('./vendor/Muse/utils.js');

var hardware = require('./hardware.js');

var webFrame = require('electron').webFrame;
webFrame.setZoomLevelLimits(1, 1);

var cur = µ('#console .cnsln');
var ques = µ('#questions').firstElementChild;

setTimeout(()=> {
  µ('#splash').style.display = 'none';
}, 3000);

require('./keyboard.js').setCharHandler(function(char) {
  if (cur) {
    if (char != '\n') {
      var fld = µ('.fld', cur)[0];
      fld.textContent = fld.textContent + char;
    } else checkAnswer();

  }
});

require('./keyboard.js').setDeleteHandler(function() {
  var fld = µ('.fld', cur)[0];
  fld.textContent = fld.textContent.substring(0, fld.textContent.length - 1);
});

function timeString() {
  var time = new Date();

  var h = zeroPad(time.getHours(), 2);
  var m = zeroPad(time.getMinutes(), 2);
  var s = zeroPad(time.getSeconds(), 2);

  return h + ':' + m  + ':' + s;
}

function newPrompt(text) {
  var clone = µ('.cnsln', µ('#promptTemp').content)[0].cloneNode(true);

  if (text == null) {
    var tdir = dir;
    var path = '';
    while (tdir) {
      path = tdir.id + '/' + path;
      tdir = tdir.parentElement;
    }

    text = timeString() + ' admin@local ' + path;
  }

  µ('.prompt', clone)[0].textContent = text;
  return clone;
}

var checkAnswer = ()=> {
  µ('.cursor', cur)[0].style.display = 'none';
  var fld = µ('.fld', cur)[0];
  if (fld.textContent == µ('|>ans', ques)) {
    var resp = µ('#' + µ('|>resp', ques) + ' .ok', µ('#responses')).cloneNode(true);
    µ('#console').appendChild(resp);
    µ('#console').scrollTop = µ('#console').scrollHeight;
    if (ques.nextElementSibling) {
      setTimeout(()=> {
        ques = ques.nextElementSibling;
        cur = newPrompt(ques.textContent);
        µ('.cursor', cur)[0].style.display = 'inline-block';
        µ('#console').appendChild(cur);
        µ('#console').scrollTop = µ('#console').scrollHeight;
      }, 1000);
    } else {
      setTimeout(()=> {
        hardware.writeOutput(1);
      }, 1000);
      setTimeout(()=> {
        var resp = µ('#done', µ('#responses')).cloneNode(true);
        µ('#console').appendChild(resp);
        µ('#console').scrollTop = µ('#console').scrollHeight;
      }, 2000);
    }
  } else if (fld.textContent == 'ipaddress') {
    var os = require('os');

    var addresses = '';

    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
          //addresses.push(address.address);
          addresses += address.address + '; ';
        }
      }
    }

    cur = newPrompt(addresses);
    µ('.cursor', cur)[0].style.display = 'inline-block';
    µ('#console').appendChild(cur);
    µ('#console').scrollTop = µ('#console').scrollHeight;
  } else {
    var resp = µ('#' + µ('|>resp', ques) + ' .err', µ('#responses')).cloneNode(true);
    µ('#console').appendChild(resp);
    setTimeout(()=> {
      cur = cur.cloneNode(true);
      µ('.cursor', cur)[0].style.display = 'inline-block';
      µ('.fld', cur)[0].textContent = '';
      µ('#console').appendChild(cur);
      µ('#console').scrollTop = µ('#console').scrollHeight;
    }, µ('|>time', ques));
  }
};

document.onkeypress = function(e) {

  e.preventDefault();
  var keyCode = (window.event) ? e.which : e.keyCode;

  if (keyCode >= 32 && keyCode <= 126) {            // 'a' = Screen activity button
    if (keyCode == 32) keyCode = 160, console.log('space'); //160
    if (cur) {
      var fld = µ('.fld', cur)[0];
      var newChar = String.fromCharCode(keyCode);
      fld.textContent = fld.textContent + newChar;
    }

  }

};

document.onkeydown = function(e) {
  var keyCode = (window.event) ? e.which : e.keyCode;

  if (keyCode === 8) {    // delete
    var fld = µ('.fld', cur)[0];
    fld.textContent = fld.textContent.substring(0, fld.textContent.length - 1);
    return false;
  } else if (keyCode === 13) {    // enter
    checkAnswer();
    return false;
  }
};
