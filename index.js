const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
  
// });

// fetchCoordsByIP('142.114.88.99', (error, data) => {
//   if (error) {
//     console.log("It didnt work", error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:', data);

// });

// fetchISSFlyOverTimes({ latitude: 43.6891, longitude: -79.5634 } ,(error, coordinates) => {
//   if (error) {
//     console.log('It didnt work', error);
//     return;
//   }
//   console.log('It worked the details are', coordinates);
// });

nextISSTimesForMyLocation( function(error, passTimes)  {
  if (error) {
    return console.log('It didnt work!', error);
  }
  printPassTimes(passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}
