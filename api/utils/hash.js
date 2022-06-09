const bcrypt = require('bcryptjs');
const appSettings = require('../../config/index');

const ErrorHandler = require('./errorHandler');

const generateHash = async (password) => {
  try {
    const hash = await bcrypt.hash(password, +appSettings.saltRound);

    return { status: 'SUCCESS', hash };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { status: 'ERROR_FOUND' };
  }
};

const verifyHash = async (encryptedPassword, password) => {
  try {
    const isMatch = await bcrypt.compare(password, encryptedPassword);

    if (!isMatch) {
      return { status: 'HASH_NOT_MATCHED' };
    }

    return { status: 'SUCCESS' };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { status: 'ERROR_FOUND' };
  }
};

module.exports = { generateHash, verifyHash };
