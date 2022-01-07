const { Message } = require('../schemas');
const ErrorHandler = require('../../../utils/errorHandler');

const createMessage = async (body) => {
  try {
    const message = await Message.schema.create(body);
    return { result: message, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

const findMessage = async (body) => {
  try {
    const message = await Message.schema.findOne(body);
    return { result: message, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

const findAllMessage = async (body) => {
  try {
    const message = await Message.schema.find(body);
    return { result: message, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

const updateMessage = async (filter, update) => {
  try {
    if (!update) {
      return { result: null, hasError: null };
    }
    const message = await Message.schema.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });
    return { result: message, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

module.exports = { createMessage, findMessage, findAllMessage, updateMessage };
