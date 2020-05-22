var centerRightSonar = require('sonar').connect({
    outputPin: A1,
    inputPin: A0
});

var rightSonar = require('sonar').connect({
    outputPin: P9,
    inputPin: P8
});

var display = require('display').connect(Serial3);


var sonarPingFrequency = 500;
var minDistance = 5;
var meteringResult = [5, 5, 5, 5];

var showMinDistance = function() {
  var dest = Math.min.apply(null, meteringResult);
  display.showMinDistance(dest.toFixed(2));
};

var rightSonarPing = function(nextFn) {
  rightSonar.ping(function(dest) {
    meteringResult[0] = dest;
    display.showDistanceIndicator('sensorRight', dest.toFixed(2));
    nextFn && nextFn();
  });
};

var centerRightSonarPing = function(nextFn) {  
  centerRightSonar.ping(function(dest) {
    meteringResult[1] = dest;
    display.showDistanceIndicator('sensorCenterR', dest.toFixed(2));
    nextFn && nextFn();
  });
};

setInterval(function() {
  rightSonarPing(centerRightSonarPing(showMinDistance));
}, sonarPingFrequency);







