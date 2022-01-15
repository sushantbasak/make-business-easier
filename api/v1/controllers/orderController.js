/* eslint-disable no-underscore-dangle */

// Library

const router = require('express').Router();
const httpCode = require('http-status-codes');

// Services

const ErrorHandler = require('../../utils/errorHandler');
const orderService = require('../services/orderService');
const gigService = require('../services/gigService');
const { protect } = require('../middleware/auth');
const { MESSAGES } = require('../../../constants');

// Functions

const createOrder = async (req, res) => {
  const { gig: gigId } = req.body;
  try {
    const buyerId = req.user._id;

    const gig = await gigService.findGig({
      _id: gigId,
    });

    // validating seller and gig
    if (gig.status === 'ERROR_FOUND') {
      throw new Error('Unable to Create new Order in the database');
    }

    if (
      gig.status === 'NOT_FOUND' ||
      gig.result.isActive === false ||
      gig.result.owner.toString() === buyerId.toString()
    ) {
      throw new Error('Invalid Gig');
    }

    // processing order
    const order = { buyer: buyerId, seller: gig.result.owner, gig: gigId };

    const registerOrder = await orderService.createOrder(order);

    if (registerOrder.status === 'ERROR_FOUND') throw new Error('Unable to Create new Order in the database');

    res.sendSuccess(registerOrder.result, MESSAGES.api.CREATED, httpCode.StatusCodes.CREATED);
  } catch (err) {
    ErrorHandler.extractError(err);
    res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await orderService.findOrder({ _id: orderId });

    if (order.status === 'ERROR_FOUND') {
      throw new Error('Unable to process the request');
    }

    if (order.status === 'NOT_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.NOT_FOUND);
    }

    // can refactor this
    if (!(order.result.buyer.toString() === userId.str || order.result.seller.toString() === userId.toString())) {
      return res.sendError(httpCode.StatusCodes.FORBIDDEN, MESSAGES.api.UNAUTHORIZED_USER);
    }

    return res.sendSuccess(order.result, MESSAGES.api.FOUND, httpCode.StatusCodes.OK);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await orderService.findAllOrdersByUserId({ userId });

    if (orders.status === 'ERROR_FOUND') {
      throw new Error('Unable to process the request');
    }

    if (orders.status === 'NOT_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.NOT_FOUND);
    }

    return res.sendSuccess(orders.result, MESSAGES.api.FOUND, httpCode.StatusCodes.OK);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const sellerId = req.user._id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['status'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.validations.INVALID_UPDATE);

    const updatedOrder = await orderService.updateOrder({ _id: orderId, seller: sellerId }, req.body);

    if (updatedOrder.status === 'ERROR_FOUND') throw new Error('Unable to Update Order in Database');

    if (updatedOrder.status === 'NOT_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.ORDER_NOT_FOUND);
    }
    return res.sendSuccess(updatedOrder.result, MESSAGES.api.UPDATE_SUCCESSFULL, httpCode.StatusCodes.OK);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

// order routes

router.post('/', protect, createOrder);
router.get('/', protect, getAllOrders);
router.get('/:orderId', protect, getOrder);
router.patch('/:orderId', protect, updateOrder);

module.exports = router;
