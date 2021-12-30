'use strict'

const sentry = require('@sentry/node');
const { red } = require('chalk');

const extractError = (error) => {
  // sentry.captureException(error)
  console.log(red('Caught Error --- \n'),error);
  return error && error.message || 'Something went wrong!';
  
}

const ErrorHandler = {
  extractError: extractError
}

module.exports = ErrorHandler
