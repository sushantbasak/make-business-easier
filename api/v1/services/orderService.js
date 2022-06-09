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

const updateOrder = async (filter, update) => {
  const { result, hasError } = await dbStoreHandler.updateOrder(filter, update);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }

  if (result === null) return { status: 'NOT_FOUND' };

  return { result, status: 'ORDER_UPDATED' };
};

const findAllOrder = async (data) => {
  const { result, hasError } = await dbStoreHandler.findAllOrder(data);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }

  if (result === null) return { status: 'NOT_FOUND' };

  return { result, status: 'ORDER_FOUND' };
};

const findAllOrdersByUserId = async (data) => {
  const { result, hasError } = await dbStoreHandler.findAllOrdersByUserId(data);

  if (hasError) {
    return { status: 'ERROR_FOUND' };
  }

  if (result === null) return { status: 'NOT_FOUND' };

  return { result, status: 'ORDER_FOUND' };
};

const orderService = {
  createOrder,
  findOrder,
  updateOrder,
  findAllOrder,
  findAllOrdersByUserId,
};

module.exports = orderService;
