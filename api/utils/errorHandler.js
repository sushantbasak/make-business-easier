const { red } = require('chalk');

const extractError = (error) => {
  // eslint-disable-next-line no-console
  console.log(red('Caught Error --- \n'), error);
  return (error && error.message) || 'Something went wrong!';
};

const ErrorHandler = {
  extractError,
};

module.exports = ErrorHandler;
