const { User } = require('../schemas');
const ErrorHandler = require('../../../utils/errorHandler');

const createUser = async (body) => {
  try {
    const result = await User.schema.create(body);

    if (result == null) return { result: null, hasError: null };

    const final = result.toJSON();

    delete final.password;

    delete final.isEmailConfirmed;

    delete final.isPasswordReset;

    return { result: final, hasError: null };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { result: null, hasError: true };
  }
};

const findUser = async (body) => {
  try {
    const result = await User.schema.findOne(body);

    if (result == null) return { result: null, hasError: null };

    const final = result.toJSON();

    delete final.password;

    return { result: final, hasError: null };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { result: null, hasError: true };
  }
};

const getPassword = async (body) => {
  try {
    const { _id, password, isEmailConfirmed } = await User.schema.findOne(body);

    if (_id == null) return { result: null, hasError: null };

    return { result: { _id, password, isEmailConfirmed }, hasError: null };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { result: null, hasError: true };
  }
};

const updateUser = async (filter, updateData) => {
  try {
    const {
      _id,
      firstName,
      lastName,
      email,
      role,
    } = await User.schema.findOneAndUpdate(filter, updateData, {
      new: true,
      runValidators: true,
    });

    if (_id == null) return { result: null, hasError: null };

    return {
      result: { _id, firstName, lastName, email, role },
      hasError: null,
    };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { result: null, hasError: true };
  }
};

module.exports = { createUser, findUser, getPassword, updateUser };
