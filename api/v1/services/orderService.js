const dbStoreHandler = require('../../dbstore/mongo');

const createOrder = async (data) => {
  const { result, hasError } = await dbStoreHandler.createOrder(data);

  if (hasError || result == null) {
    return { status: 'ERROR_FOUND' };
  }

  return { result, status: 'ORDER_CREATED' };
};

const findOrder = async (data) => {
  const { result, hasError } = await dbStoreHandler.findOrder(data);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }
  if (!result) {
    return { status: 'NOT_FOUND' };
  }

  return { result, status: 'ORDER_FOUND' };
};

const orderService = {
  createOrder,
  findOrder,
};

module.exports = orderService;
