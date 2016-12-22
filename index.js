var Bleacon = require('bleacon');
//replace localhost with your server's IP;
var socket = require('socket.io-client')('http://192.168.0.104:3000/scanner');
var schedule = require('node-schedule');
var dateFormat = require('dateformat');

//Bleacon.startScanning(); // scan for any bleacons

// Yellow Beacon
var yellowBeacon = {
  name: 'yellow',
  uuid: 'b9407f30f5f8466eaff925556b57fe6d',
  major: 23961,
  minor: 1914
};

// Red Beacon
var redBeacon = {
  name: 'red',
  uuid: 'b9407f30f5f8466eaff925556b57fe6d',
  major: 35487,
  minor: 12489
};

var beacon;
if(process.env.BEACON_COLOR === "red") {
  beacon = redBeacon;
} else if (process.env.BEACON_COLOR === "yellow") {
  beacon = yellowBeacon;
} else {
  process.exit();
}

var emittingData = {};
Bleacon.on("discover", function (bleacon) {
  emittingData = {
    name: beacon.name,
    rssi: bleacon.rssi,
    time: dateFormat(new Date(), "hh:MM:ss")
  };
});

socket.on('connect', function(){
  console.log('connected to server');
  Bleacon.startScanning(beacon.uuid, beacon.major, beacon.minor); // scan for bleacons with a particular uuid. major, and minor
});

var rule = new schedule.RecurrenceRule();
rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

schedule.scheduleJob(rule, function () {
  socket.emit('deviceData', emittingData);
});
