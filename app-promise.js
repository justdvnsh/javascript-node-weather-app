const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
  a: {
    demand: false,
    alias: 'address',
    string: true, //checks the address is a string.
    description: 'The address you want to find out...!'
  }
}).help().alias('help', 'h').argv

console.log(argv.address)
var encodedAddress;
if (argv.address) {
  encodedAddress = encodeURIComponent(argv.address);
} else {
  encodedAddress = encodeURIComponent(208019)
}

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  console.log(response.data)
})

axios.get(geocodeUrl).then((response) => {
  // since we get a promise back from the .get() method.
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to fecth the data')
  }
  //console.log(response.data)
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  console.log(response.data.results[0].formatted_address);
  var weatherUrl = `https://api.darksky.net/forecast/bc3ab04d93508a502fa2a57fc94c0310/${lat},${lng}`
  return axios.get(weatherUrl)
}).then((response) => {
  var temp = response.data.currently.temperature;
  var appTemp = response.data.currently.apparentTemperature;
  console.log('Temperature is :-> ', temp, ' but feels like, ',appTemp)
}).catch((e) => {
  if (e.code === 'ENOTFOUND'){
    console.log('Unable to connect to servers')
  } else {
    console.log(e.message)
  }
})
