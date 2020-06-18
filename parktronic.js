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

var rightSonarPing = function() {
  rightSonar.ping(function(dest) {
    meteringResult[0] = dest;
    display.showDistanceIndicator('sensorRight', dest.toFixed(2));
    nextFn && nextFn();
  });
};

var centerRightSonarPing = function() {  
  centerRightSonar.ping(function(dest) {
    meteringResult[1] = dest;
    display.showDistanceIndicator('sensorCenterR', dest.toFixed(2));
    nextFn && nextFn();
  });
};

var centerLeftSonarPing = function() {  
  centerLeftSonar.ping(function(dest) {
    meteringResult[2] = dest;
    display.showDistanceIndicator('sensorCenterL', dest.toFixed(2));
    nextFn && nextFn();
  });
};

var leftSonarPing = function() {  
  leftSonar.ping(function(dest) {
    meteringResult[3] = dest;
    display.showDistanceIndicator('sensorLeft', dest.toFixed(2));
    nextFn && nextFn();
  });
};

var queue = [
  rightSonarPing, 
  centerRightSonarPing, 
  centerLeftSonarPing, 
  leftSonarPing
];
var i = 0;

var nextFn = function() {
    if (i < queue.length) {
        i++;
        queue[i-1]();
    }
};

setInterval(function() {
  i = 0;
  nextFn()
  showMinDistance();
}, sonarPingFrequency);
