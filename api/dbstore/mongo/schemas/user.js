const mongoose = require('mongoose');
const { COLLECTIONS } = require('../../../../constants');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add First name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add Last name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    /* eslint-disable */
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  role: {
    type: String,
    enum: ['root', 'admin', 'seller', 'customer'],
    default: 'customer',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  isPasswordReset: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  gigs: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'gig'
    }
  ],
  cart: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'gig'
    }
  ]
});

module.exports = {
  schema: mongoose.model(COLLECTIONS.USER, userSchema),
};
