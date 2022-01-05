const { Order } = require('../schemas');
const ErrorHandler = require('../../../utils/errorHandler');

const createOrder = async (body) => {
    try {
        const order = await Order.schema.create(body);
        const result = order ? order.toJSON() : null;
        return {result: result, hasError: null}
    } catch(err) {
        ErrorHandler.extractError(err);
        return {result: null, hasError: true};
    }
}

const findOrder = async (body) => {
  try {
      const order = await Order.schema.findOne(body);
      const result = order ? order.toJSON() : null;
      return {result: result, hasError: null};
  } catch(err) {
      ErrorHandler.extractError(err);
      return {result: null, hasError: true}; 
  }
}

const findAllOrder = async (body) => {
  try {
      const order = await Order.schema.find(body);
      return {result: order, hasError: null};
  } catch(err) {
      ErrorHandler.extractError(err);
      return {result: null, hasError: true};
        
  }
}

const updateOrder = async (filter, update) => {
    try {
        if(!update){
            return {result: null, hasError: null}
        }
        const order = await Order.schema.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true
        });
        return {result: order, hasError: null}
    } catch(err) {
        ErrorHandler.extractError(err);
        return {result: null, hasError: true}
    } 
}

module.exports = { createOrder, findOrder, findAllOrder, updateOrder}