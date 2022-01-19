/* eslint-disable consistent-return */
// Library

const jwt = require('jsonwebtoken');
const httpCode = require('http-status-codes');
const url = require('url');

// Services

const appSettings = require('../../../config/index');
const ErrorHandler = require('../../utils/errorHandler');
const { MESSAGES } = require('../../../constants');

const {
  jwt: { secret, resetsecret },
} = appSettings;

// Imports

const userService = require('../services/userService');

// Functions

const protect = async (req, res, next) => {
  try {
    if (req.header('Authorization') === undefined) {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.MISSING_BEARER_TOKEN);
    }

    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = await jwt.verify(token, secret);

    const { result, status } = await userService.findUser({
      _id: decoded.id,
    });

    if (status === 'ERROR_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.USER_NOT_FOUND);
    }

    if (result.isEmailConfirmed === false) {
      return res.sendError(httpCode.StatusCodes.OK, MESSAGES.api.EMAIL_NOT_CONFIRMATION);
    }

    const { pathname } = url.parse(req.url, true);

    if (pathname === '/update') req.body = { ...req.body, mode: 0 };

    req.user = result;

    next();
  } catch (ex) {
    ErrorHandler.extractError(ex);
    return res.sendError(httpCode.StatusCodes.UNAUTHORIZED, MESSAGES.api.UNAUTHORIZED_USER);
  }
};

const resetPasswordToken = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (token === undefined) {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.MISSING_QUERY_PARAMETER);
    }

    req.body = { ...req.body, mode: 0 };

    const decoded = await jwt.verify(token, resetsecret);

    const { result, status } = await userService.findUser({
      _id: decoded.id,
    });

    if (status === 'ERROR_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.USER_NOT_FOUND);
    }

    req.user = result;

    next();
  } catch (ex) {
    ErrorHandler.extractError(ex);
    return res.sendError(httpCode.StatusCodes.UNAUTHORIZED, MESSAGES.api.LINK_EXPIRED);
  }
};

const confirmEmailToken = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (token === undefined) {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.MISSING_QUERY_PARAMETER);
    }

    const decoded = await jwt.verify(token, secret);

    const { result, status } = await userService.findUser({
      _id: decoded.id,
    });

    if (status === 'ERROR_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.USER_NOT_FOUND);
    }

    req.user = result;

    next();
  } catch (ex) {
    ErrorHandler.extractError(ex);
    return res.sendError(httpCode.StatusCodes.UNAUTHORIZED, MESSAGES.api.LINK_EXPIRED);
  }
};

module.exports = {
  protect,
  resetPasswordToken,
  confirmEmailToken,
};
