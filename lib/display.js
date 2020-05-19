function Display(serial) {

    serial.setup(9600);
    var mas=[];


function delitMas() {
    while (mas.length > 1) {
        mas.shift();
    }
  mas[0]=undefined;
}

function sendCommand(cmd){
  delitMas();
  console.log("cmd",cmd);
  serial.print(cmd);
  serial.write(0xFF);
  serial.write(0xFF);
  serial.write(0xFF);
}
/*
CommandFinished=function() {
  if(mas[0]===1){
      delitMas();
  console.log('CommandFinished');
   return true;
  }
};
*/

/*
function start(data){
    var ret= false;
    sendCommand(data);
/*
 setTimeout(function(){
   ret = CommandFinished();
   console.log("ret",ret);
   if(!ret){
     if(i < 1)
      start(data);
     i++;
            }
     else{
       i=0;
       return true;
   }
   }
            ,100);

  }
*/


sendCommand('distanceValue.txt="0.29"');


    this.distance = function(v) {
        sendCommand('distanceValue.txt="' + v + '"');
    }
}

exports.connect = function(serial) {
    return new Display(serial);
}
