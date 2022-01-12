const dbStoreHandler = require("../../dbstore/mongo");

const createOrder = async (data) => {
  const { result, hasError } = await dbStoreHandler.createOrder(data);

  if (hasError || result == null) {
    return { status: "ERROR_FOUND" };
  }

  return { result, status: "ORDER_CREATED" };
};

const orderService = {
  createOrder,
};

module.exports = orderService;
