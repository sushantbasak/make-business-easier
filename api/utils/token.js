const jwt = require('jsonwebtoken');

const appSettings = require('../../config/index');
const ErrorHandler = require('./errorHandler');
const { ROLES } = require('../../constants');

const {
  jwt: { secret, expiresIn, resetsecret, resetexpiresIn },
} = appSettings;

const generateAuthToken = async (userId, expiry = false) => {
  try {
    let expiryTime = expiresIn;
    let secretValue = secret;

    if (expiry) {
      expiryTime = resetexpiresIn;

      secretValue = resetsecret;
    }

    const token = await jwt.sign({ id: userId, date: new Date().getTime() }, secretValue, { expiresIn: expiryTime });

    return { status: 'SUCCESS', token };
  } catch (ex) {
    ErrorHandler.extractError(ex);
    return { status: 'ERROR_FOUND' };
  }
};

const generateUserAuthToken = async (userId, role = ROLES.CUSTOMER, expiry = false) => {
  try {
    let expiryTime = expiresIn;
    let secretValue = secret;

    if (expiry) {
      expiryTime = resetexpiresIn;

      secretValue = resetsecret;
    }

    const token = await jwt.sign({ id: userId, role, date: new Date().getTime() }, secretValue, {
      expiresIn: expiryTime,
    });

    return { status: 'SUCCESS', token };
  } catch (ex) {
    ErrorHandler.extractError(ex);
    return { status: 'ERROR_FOUND' };
  }
};

module.exports = { generateAuthToken, generateUserAuthToken };
