'use strict';

/* eslint-env node */

const Alexa = require('alexa-sdk');
const generators = require('./generator');

const APP_ID = 'GizmetPerilousWilds'; // TODO replace with your app ID (OPTIONAL).
const SKILL_NAME = 'The Perilous Wilds';
const HELP_MESSAGE = 'You can ask me to generate a place, region, or treasure, or, you can say exit ... What can I do for you?';
const HELP_REPROMPT = 'Would you like me to generate a place, region, or treasure?';
const STOP_MESSAGE = 'Venture forth!';
const GENERATOR_NOT_FOUND_MESSAGE = 'I don\'t know how to do that. Please ask for a place, region, or treasure.';
const GENERATOR_NOT_FOUND_REPROMPT = 'Would you like me to generate a place, region, or treasure?';
const generatorMessages = {
  place: 'This place is called',
  region: 'This region is called',
  treasure: 'You found: ',
};

const handlers = {
  LaunchRequest: function LaunchRequest() {
    this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
  },
  SessionEndedRequest: function SessionEndedRequest() {
    this.emit(':tell', STOP_MESSAGE);
  },
  GeneratePlaceIntent: function GeneratePlaceIntent() {
    const generatedResponse = generators.place.generate();
    const speechOutput = `${generatorMessages.place} ${generatedResponse}`;
    this.emit(':tellWithCard', speechOutput, SKILL_NAME, generatedResponse);
  },
  GenerateIntent: function GenerateIntent() {
    const generatorTypeSlot = this.event.request.intent.slots.GeneratorType;
    if (generatorTypeSlot && generatorTypeSlot.value) {
      const generatorType = generatorTypeSlot.value.toLowerCase();

      if (generatorType in generators) {
        const generatedResponse = generators[generatorType].generate();
        const speechOutput = `${generatorMessages[generatorType]} ${generatedResponse}`;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, generatedResponse);
      }
      else {
        // incorrect request type
        this.emit(':ask', GENERATOR_NOT_FOUND_MESSAGE, GENERATOR_NOT_FOUND_REPROMPT);
      }
    }
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
