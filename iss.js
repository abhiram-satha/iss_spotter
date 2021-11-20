const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=6ba461a0-49ad-11ec-a02e-a56408d63276`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    
    const { latitude, longitude } = JSON.parse(body);
    //console.log(JSON.parse(body))
    callback(null, { latitude, longitude});
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code: ${response.statusCode} when using the following latitude: ${coords.latitude} and longitude: ${coords.longitude}`));
      return;
    }
    const flyOver = JSON.parse(body);
    callback(null, flyOver.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP(function (error, ip) {
    if (error) {
      console.log(`1. Unable to proceed, there is an error`, error);
      return;
    }
    fetchCoordsByIP(ip, (error, coords)=> {
      if (error) {
        console.log("2. Unable to proceed, there is an error", error);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          console.log('3. Unable to proceed, there is an error', error);
          return;
        }
        callback(null, nextPasses);
      }
    )
  });





  //console.log(ipAddress);
})
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};