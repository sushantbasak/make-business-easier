const User = require('./user');
const Gig = require('./gig');
const Message = require('./message')
const Order = require('./order')

const schemas = {
  User,
  Gig,
  Order,
  Message
};

module.exports = schemas;
