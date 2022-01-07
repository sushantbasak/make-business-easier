/* eslint-disable consistent-return */
const httpCode = require('http-status-codes');
const { MESSAGES, ROLES } = require('../../../constants');

const adminProtect = (req, res, next) => {
  if (!(req.user.role === ROLES.ADMIN || req.user.role === ROLES.ROOT))
    return res.sendError(
      httpCode.StatusCodes.UNAUTHORIZED,
      MESSAGES.api.UNAUTHORIZED_USER
    );

  next();
};

module.exports = {
  adminProtect,
};
