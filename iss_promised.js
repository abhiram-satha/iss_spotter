const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');

}

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=6ba461a0-49ad-11ec-a02e-a56408d63276`)
};

const fetchISSFlyOverTimes = function(coordinates) {
  let coords = JSON.parse(coordinates);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response;
    })

}

  module.exports = {
    nextISSTimesForMyLocation,
  }