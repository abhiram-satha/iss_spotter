const {nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((times) => {
    console.log(times);
  })
  .catch((error) => {
    console.log('It didnt work:', error.message);
  });