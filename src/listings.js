'use strict';

/* eslint-env node */

const request = require('request');
const aicApi = 'http://tonight-in-aic.herokuapp.com/';

exports.get = () => new Promise((resolve, reject) => {
  request(aicApi, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      resolve(JSON.parse(body));
    }
    else {
      reject(error);
    }
  });
});

const venueToSpeech = (entry) => {
  let output = '';
  entry.forEach((e) => {
    let price = e.price.replace(/\$/, '');
    if (!isNaN(price)) {
      price += ' dollars';
    }
    output += `\nAt ${e.time}: ${e.description} : ${price}`;
  });
  return output;
};

exports.speech = (listings, venue) => {
  let output = listings.date;

  if (venue in listings.entries) {
    output += `\n${venue}:\n${venueToSpeech(listings.entries[venue])}`;
  }
  else {
    Object.keys(listings.entries).forEach((e) => {
      if (e.match(/^FACT /)) {
        output += `\n${e}: ${listings.entries[e]}`;
      }
      else {
        output += `\n${e}:\n${venueToSpeech(listings.entries[e])}`;
      }
    });
  }
  return output;
};
