'use strict';

/* eslint-env node */

const request = require('request');
const aicApi = 'http://tonight-in-aic.herokuapp.com/';

function ucFirst(str) {
  return str.split(' ').map(e => e[0].toUpperCase() + e.slice(1).toLowerCase()).join(' ');
}

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
    if (typeof e.price === 'undefined') {
      e.price = 'no price listed';
    }
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
    output += `\n${ucFirst(venue)}:\n${venueToSpeech(listings.entries[venue])}`;
  }
  else if (venue.match(/^all/i)){
    Object.keys(listings.entries).forEach((e) => {
      if (e.match(/^FACT /)) {
        output += `\n${ucFirst(e)}: ${listings.entries[e]}`;
      }
      else {
        output += `\n${ucFirst(e)}:\n${venueToSpeech(listings.entries[e])}`;
      }
    });
  }
  else {
    output = `No listings found for ${venue} today.`;
  }
  return output;
};
