
var shift = 0;
var capslock = false;

console.log('here');

var handleChar = (char)=> {};

var handleDelete = ()=> {};

exports.setCharHandler = (cb)=> {
  console.log('set char');
  handleChar = cb;
};

exports.setDeleteHandler = (cb)=> {
  handleDelete = cb;
};

µ('li', µ('#keyboard')).forEach(function(ind, item) {
  item.onclick = function(e) {
    var _this = item;
    var character = _this.innerHTML; // If it's a lowercase letter, nothing happens to this variable

    // Shift keys
    if (_this.className.includes('shift')) {
      //$('.letter').toggleClass('uppercase');
      //$('.symbol span').toggle();
      if (!shift) {
        shift = 1;
        µ('#keyboard').className = 'shift';
      } else {
        shift = 0;
        µ('#keyboard').className = '';
      }

      capslock = false;
      return false;
    }

    // Caps lock
    if (_this.className.includes('capslock')) {
      if (capslock) {
        capslock = 0;
        µ('#keyboard').className = '';
      } else {
        capslock = 1;
        µ('#keyboard').className = 'shift capslock';
      }

      return false;
    }

    // Delete
    if (_this.className.includes('delete')) {
      handleDelete();
      return true;
    }

    // Special characters
    if (_this.className.includes('symbol')) character = µ('span.' + ((shift) ? 'on' : 'off'), _this)[0].innerHTML;
    if (_this.className.includes('space')) character = String.fromCharCode(160);
    if (_this.className.includes('tab')) character = '\t';
    if (_this.className.includes('return')) character = '\n';

    // Uppercase letter
    if (shift) character = character.toUpperCase();

    // Remove shift once a key is clicked.
    if (shift) {
      shift = 0;
      µ('#keyboard').className = ((capslock) ? 'shift capslock' : '');
    }

    // Add the character
    //$write.html($write.html() + character);
    handleChar(character);
  };
});
