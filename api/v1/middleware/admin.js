/* eslint-disable consistent-return */
const httpCode = require('http-status-codes');
const { MESSAGES } = require('../../../constants');

const adminProtect = (req, res, next) => {
  if (req.user.role !== 'admin' )
    return res.sendError(
      httpCode.StatusCodes.UNAUTHORIZED,
      MESSAGES.api.UNAUTHORIZED_USER
    );

  next();
};

module.exports = {
  adminProtect,
};
