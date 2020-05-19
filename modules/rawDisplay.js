function Display(serial) {
    /*
    NEX_RET_EVENT_TOUCH_HEAD = 0x65;
NEX_RET_CURRENT_PAGE_ID_HEAD = 0x66;
NEX_RET_STRING_HEAD = 0x70;
NEX_RET_NUMBER_HEAD = 0x71;

var buffer="";
serial.setup(9600);
var mas=[];
var i=0;

function delitMas() {
    while (mas.length > 1) {
        mas.shift();
    }
  mas[0]=undefined;
}

/*
serial.on('data', function (data) {
var mass = [];
  buffer += data;
   var lines = buffer.indexOf('\xFF\xFF\xFF');
  if (lines > 0){
   for(l=0;l < lines ;l++){
     mass[l] = buffer.charCodeAt(l);
   }}
  setTimeout( function(){buffer="";},20);
  if(mass > 0){
   mas = mass;
   return mass;
   }
  });
*/

/*
setInterval(function() {
  data();
},100);
*/
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
*/
  }



sendCommand('distanceValue.txt="55"');
/*
start("bkcmd=1");
start("page 0");
*/
function data() {
    if (mas.length > 2) {
        switch (mas[0]) {
            case NEX_RET_EVENT_TOUCH_HEAD:
                if (mas.length == 4) {
                    print('Page', mas[1]);
                    print('Component ID', mas[2]);
                    var pres = mas[3] ? 'Press' : 'Release';
                    print(pres);
                }
                delitMas();
                break;
            case NEX_RET_CURRENT_PAGE_ID_HEAD:
                if (mas.length == 2) {
                    print ('Page', mas[1]);
                }
                delitMas();
                break;
            case NEX_RET_STRING_HEAD:
                var mas1='';
                mas.shift();
                for(l=0;l <mas.length ;l++){
                  mas1 += String.fromCharCode(mas[l]);}
                print('string',mas1);
                delitMas();
                break;
            case NEX_RET_NUMBER_HEAD:
            var mas2;
                mas.shift();
                number = (mas[3] << 24) | (mas[2] << 16) | (mas[1] << 8) | (mas[0]);
                print('Number',number);
                delitMas();
                break;
        }
    }
}


    this.distance = function(v) {
        start('distanceValue.txt="' + v + '"');
    }
}

exports.connect = function(serial) {
    return new Display(serial);
}
