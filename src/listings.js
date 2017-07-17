'use strict';

/* eslint-env node */

const request = require('request');
const aicApi = 'http://tonight-in-aic.herokuapp.com/';

exports.all = () => new Promise((resolve, reject) => {
  request(aicApi, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      resolve(body);
    }
    else {
      reject(error);
    }
  });
});
