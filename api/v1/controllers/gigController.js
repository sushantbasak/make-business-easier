const router = require('express').Router();
const httpCode = require('http-status-codes');

const ErrorHandler = require('../../utils/errorHandler');
const gigService = require('../services/gigService');
const { protect } = require('../middleware/auth');
const { MESSAGES } = require('../../../constants');

const createGig = async (req, res) => {
  try {
    const result = await gigService.createGig(req.body);

    if (result.status === 'ERROR_FOUND') {
      throw new Error('Unable to create new Gig');
    }

    return res.sendSuccess(result.result, MESSAGES.api.CREATED, httpCode.StatusCodes.CREATED);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

const getGig = async (req, res) => {
  try {
    const result = await gigService.findGig({ _id: req.params.gig_id });

    if (result.status === 'ERROR_FOUND') {
      throw new Error('Unable to get the Gig');
    }
    if (result.status === 'NOT_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.NOT_FOUND);
    }

    return res.sendSuccess(result.result, MESSAGES.api.FOUND, httpCode.StatusCodes.FOUND);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

const getAllGigs = async (req, res) => {
  try {
    const result = await gigService.findAllGig(req.body);

    if (result.status === 'ERROR_FOUND') {
      throw new Error('Unable to get all Gigs');
    }
    if (result.status === 'NOT_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.NOT_FOUND);
    }

    return res.sendSuccess(result.result, MESSAGES.api.FOUND, httpCode.StatusCodes.FOUND);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

const updateGig = async (req, res) => {
  try {
    const result = await gigService.updateGig({ _id: req.params.gig_id }, req.body);

    if (result.status === 'ERROR_FOUND') {
      throw new Error('Unable to update the Gig');
    }
    if (result.status === 'NOT_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.NOT_FOUND);
    }

    return res.sendSuccess(result.result, MESSAGES.api.UPDATE_SUCCESSFULL, httpCode.StatusCodes.OK);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.UPDATE_UNSUCCESSFULL);
  }
};

const deleteGig = async (req, res) => {
  try {
    const result = await gigService.deleteGig({ _id: req.params.gig_id });

    if (result.status === 'ERROR_FOUND') {
      throw new Error('Unable to delete the Gig');
    }
    if (result.status === 'NOT_FOUND') {
      return res.sendError(httpCode.StatusCodes.BAD_REQUEST, MESSAGES.api.NOT_FOUND);
    }

    return res.sendSuccess(result.result, MESSAGES.api.SUCCESS, httpCode.StatusCodes.OK);
  } catch (err) {
    ErrorHandler.extractError(err);
    return res.sendError(httpCode.StatusCodes.INTERNAL_SERVER_ERROR, MESSAGES.api.SOMETHING_WENT_WRONG);
  }
};

router.post('/', protect, createGig);
router.get('/:gig_id', getGig);
router.get('/', protect, getAllGigs);
router.put('/:gig_id', protect, updateGig);
router.delete('/:gig_id', protect, deleteGig);

module.exports = router;
