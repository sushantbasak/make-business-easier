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

    if (gig.status === 'NOT_FOUND' || gig.result.isActive === false || gig.result.owner.str === buyerId.str) {
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

// order routes

router.post('/', protect, createOrder);

module.exports = router;
