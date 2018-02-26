const request = require('request');
const fs = require('fs');

var geocodeAddress = function(address, callback){
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error){
      callback('Unable to Connect to the servers....!!!')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Address not found...!!!!')
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude:  body.results[0].geometry.location.lng
      })
    }
  });
}


module.exports = {
  geocodeAddress,
  //forecast
}
