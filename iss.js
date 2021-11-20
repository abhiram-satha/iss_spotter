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
  if(response.statusCode !== 200) {
    callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
    return;
  }
  
  const { latitude, longitude } = JSON.parse(body);
  console.log(JSON.parse(body))
  callback(null, { latitude, longitude});
  });

};

//fetchCoordsByIP('142.114.88.99', true)


module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
 }