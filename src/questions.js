'use strict';

var fs  = require('fs');

exports.settings = {};

exports.load = () => {
  let data = fs.readFileSync(__dirname + 'questions.json');
  exports.settings = JSON.parse(data);
};

exports.load();

exports.save = (data) => {
  fs.writeFileSync(__dirname + 'questions.json', JSON.stringify(data));
};
