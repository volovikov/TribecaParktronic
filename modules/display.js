function Display(serial) {

    function sendCommand(cmd){
      console.log("sendCommand: ", cmd);
      serial.print(cmd);
      serial.write(0xFF);
      serial.write(0xFF);
      serial.write(0xFF);
    }


    this.showMinDistance = function(distance) {
        serial && serial.setup(9600);
        sendCommand('distanceValue.txt="' + distance + '"');
    }
    this.showDistanceIndicator = function(sensorKey, distance) {
        var sensorKey = sensorKey || 'sensorLeft',
            command = sensorKey + '.pic=';

        if (distance < 1) {
            command += '5';
        } else if (distance >= 1 && distance < 2) {
            command += '3';
        } else if (distance >= 2 && distance < 3) {
            command += '2';
        } else if (distance >= 3 && distance < 4 ) {
            command += '4';
        } else if (distance >= 4) {
            command += '1';
        }
        serial && serial.setup(9600);
        sendCommand(command);
    }
}

exports.connect = function(serial) {
    return new Display(serial);
}
