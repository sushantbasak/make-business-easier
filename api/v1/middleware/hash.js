/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// Library

const bcrypt = require('bcryptjs');
const httpCode = require('http-status-codes');

// Services

const ErrorHandler = require('../../utils/errorHandler');
const { MESSAGES } = require('../../../constants');

// Imports

const userService = require('../services/userService');

// Functions

const compareHash = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.validations.MISSING_CREDENTIALS);

    const { result, status } = await userService.getPassword({
      email,
    });

    if (status === 'ERROR_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.USER_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, result.password);

    if (!isMatch) {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.INVALID_CREDENTIALS);
    }

    req.user = { _id: result._id };

    next();
  } catch (ex) {
    ErrorHandler.extractError(ex);
    res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

module.exports = { compareHash };
