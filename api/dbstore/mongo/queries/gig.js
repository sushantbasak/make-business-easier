const { Gig } = require('../schemas');
const ErrorHandler = require('../../../utils/errorHandler');

const createGig = async (body) => {
  try {
    const gig = await Gig.schema.create(body);
    return { result: gig, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

const findGig = async (body) => {
  try {
    const gig = await Gig.schema.findOne(body);
    return { result: gig, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

const findAllGig = async (body) => {
  try {
    const gig = await Gig.schema.find(body);
    return { result: gig, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

const updateGig = async (filter, update) => {
  try {
    if (!update) {
      return { result: null, hasError: null };
    }
    const gig = await Gig.schema.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });
    return { result: gig, hasError: null };
  } catch (err) {
    ErrorHandler.extractError(err);
    return { result: null, hasError: true };
  }
};

module.exports = { createGig, findGig, findAllGig, updateGig };
