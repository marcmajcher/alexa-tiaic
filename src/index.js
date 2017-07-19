'use strict';

/* eslint-env node */

const Alexa = require('alexa-sdk');
const listings = require('./listings');

const APP_ID = 'GizmetTonightInAIC'; // TODO replace with your app ID (OPTIONAL).
const SKILL_NAME = 'Tonight in the AIC';
const HELP_MESSAGE = 'You can ask me for all listings, listings for a specific theater, or, you can say exit ... What can I do for you?';
const HELP_REPROMPT = 'Would you like me to give you listings for a specific theater, or all listings?';
const STOP_MESSAGE = 'Good bye.';
const LISTING_NOT_FOUND_MESSAGE = 'I don\'t know how to do that. Please ask for all listings, or listings for a specific theater.';
const LISTING_NOT_FOUND_REPROMPT = 'Would you like me to give you listings for a specific theater, or all listings?';

const handlers = {
  LaunchRequest: function LaunchRequest() {
    this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
  },
  SessionEndedRequest: function SessionEndedRequest() {
    this.emit(':tell', STOP_MESSAGE);
  },
  ListingIntent: function GenerateIntent() {
    const theater = this.event.request.intent.slots.Theater;
    if (theater && theater.value) {
      listings.get()
        .then((listingResponse) => {
          const theaterName = theater.value.toUpperCase();
          const speechOutput = listings.speech(listingResponse, theaterName);
          this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // else {
    //   // incorrect request type
    //   this.emit(':ask', LISTING_NOT_FOUND_MESSAGE, LISTING_NOT_FOUND_REPROMPT);
    // }
    else {
      this.emit('LaunchRequest');
    }
  },
  'AMAZON.HelpIntent': function HelpIntent() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function CancelIntent() {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function StopIntent() {
    this.emit(':tell', STOP_MESSAGE);
  }
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
