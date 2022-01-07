const mongoose = require('mongoose');
const { COLLECTIONS } = require('../../../../constants');

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.USER,
    required: [true, 'Please add a buyer'],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.USER,
    required: [true, 'Please add a seller'],
  },
  gig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.GIG,
    required: [true, 'Please add the gig'],
  },
  status: {
    type: String,
    enum: ['pending', 'inprogress', 'completed', 'rejected'],
    default: 'pending',
  },
  messages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTIONS.MESSAGE,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  schema: mongoose.model(COLLECTIONS.ORDER, orderSchema),
};
