const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    string: true, //checks the address is a string.
    description: 'The address you want to find out...!'
  }
}).help().alias('help', 'h').argv


geocode.geocodeAddress(argv.address, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(result.address);
    console.log(result.latitude, result.longitude)
    weather.forecast(result.latitude, result.longitude , (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(JSON.stringify(res, undefined, 2))
      }
    });
  }
})
