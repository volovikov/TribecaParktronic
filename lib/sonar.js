function Sonar(pins) {
    var defaultUnits = 'm';

    var startTime,
        stopTime;

    var maxDistance = 4,
        soundSpeed = 340,
        maxResponseTime = (1000 * maxDistance * 2) / soundSpeed;

    setWatch(function(e) {
        startTime = e.time;
    }, pins.inputPin, {
        edge: 'rising'
    });

    setWatch(function(e) {
        stopTime = e.time;
    }, pins.inputPin, {
        edge: 'falling'
    });

    function convertUnits(s, units) {
        if (units === undefined) {
          return s;
        }
        switch (units) {
          case 'm':
            return (s / 2) * soundSpeed;
          case 'cm':
            return (s / 2) * soundSpeed * 100;
          case 'mm':
            return (s / 2) * soundSpeed * 1000;
          case 's':
            return s;
          case 'ms':
            return s * 1000;
          case 'us':
            return s * 1000000;
        }
    }

    function ping(callback) {
        digitalPulse(pin.outputPin, 0, 5); // 5 sec отдаем 0
        digitalPulse(pin.outputPin, 0, 0); // ждем
        digitalPulse(pin.outputPin, 1, 20); // 10 sec отдаем 1
        digitalPulse(pin.outputPin, 0, 20); // ждем      
        
        setTimeout(function() {
          callback && callback(convertUnits(stopTime - startTime, defaultUnits));
        }, maxResponseTime);
    }

}

exports.connect = function(pins) {
    return new Sonar(pins);
};