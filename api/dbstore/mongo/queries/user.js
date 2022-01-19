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

const findAllUser = async (body) => {
  try {
    const result = await User.schema.find(body);

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
    const userData = await User.schema.findOne(body);

    if (userData == null || userData === undefined) return { result: null, hasError: null };

    const { _id, password, isEmailConfirmed } = userData;

    return { result: { _id, password, isEmailConfirmed }, hasError: null };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { result: null, hasError: true };
  }
};

const updateUser = async (filter, updateData) => {
  try {
    const userData = await User.schema.findOneAndUpdate(filter, updateData, {
      new: true,
      runValidators: true,
    });

    if (userData == null || userData === undefined) return { result: null, hasError: null };

    const { _id, firstName, lastName, email, role } = userData;

    return {
      result: { _id, firstName, lastName, email, role },
      hasError: null,
    };
  } catch (ex) {
    ErrorHandler.extractError(ex);

    return { result: null, hasError: true };
  }
};

module.exports = { createUser, findUser, findAllUser, getPassword, updateUser };
