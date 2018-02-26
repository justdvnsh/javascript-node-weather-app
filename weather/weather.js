const fs = require('fs');
const request = require('request');

var forecast = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/bc3ab04d93508a502fa2a57fc94c0310/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (error){
      callback('Unable to Connect to the servers....!!!')
    } else if (response.statusCode === 400) {
      callback('Bad request')
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        appTemperature: body.currently.apparentTemperature
      })
    }
  });
}

module.exports = {
  forecast
}
