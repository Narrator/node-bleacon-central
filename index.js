var Bleacon = require('bleacon');

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

Bleacon.startScanning(beacon.uuid, beacon.major, beacon.minor); // scan for bleacons with a particular uuid. major, and minor

Bleacon.on("discover", function (bleacon) {
  console.log({
    rssi: bleacon.rssi,
    name: beacon.name
  });
});
