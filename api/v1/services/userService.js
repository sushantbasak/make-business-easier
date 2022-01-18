// Services

const dbStoreHandler = require('../../dbstore/mongo');

// Functions

const createUser = async (data) => {
  const { result, hasError } = await dbStoreHandler.createUser(data);

  if (hasError || result == null) {
    return { status: 'ERROR_FOUND' };
  }
  return { result, status: 'USER_CREATED' };
};

const findUser = async (data) => {
  const { result, hasError } = await dbStoreHandler.findUser(data);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }

  if (result === null) return { status: 'NOT_FOUND' };

  return { result, status: 'USER_FOUND' };
};

const findAllUser = async (data) => {
  const { result, hasError } = await dbStoreHandler.findAllUser(data);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }

  if (result === null) return { status: 'NOT_FOUND' };

  return { result, status: 'USER_FOUND' };
};

const getPassword = async (data) => {
  const { result, hasError } = await dbStoreHandler.getPassword(data);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }

  if (result === null) return { status: 'NOT_FOUND' };

  return { result, status: 'USER_FOUND' };
};

const updateUser = async (filter, updateData) => {
  const { result, hasError } = await dbStoreHandler.updateUser(filter, updateData);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }

  if (result === null) return { status: 'NOT_FOUND' };

  return { result, status: 'USER_UPDATED' };
};

const userService = {
  createUser,
  findUser,
  findAllUser,
  getPassword,
  updateUser,
};

module.exports = userService;
