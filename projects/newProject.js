var leftSonar = require('sonar').connect({
    outputPin: P0,
    inputPin: P1
});


var rightSonar = require('sonar').connect({
    outputPin: P9,
    inputPin: P8
});

var display = require('display').connect(Serial3);

leftSonar.ping(function(dest) {
  console.log('Sonar Left: ' + dest);
});
rightSonar.ping(function(dest) {
  console.log('Sonar Right: ' + dest);
});