const mongoose = require("mongoose");
const appSettings = require("../../../config");

const mongoDB = appSettings.mongoDb;

const userQueries = require("./queries/user");
const gigQueries = require("./queries/gig");
const {
  createUser,
  findUser,
  findAllUser,
  getPassword,
  updateUser,
} = require("./queries/user");

const { createOrder } = require("./queries/order");

mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  // eslint-disable-next-line no-console
  () => console.log(`Database Connected on ${mongoDB}`)
);

const dbStoreHandler = {
  ...userQueries,
  ...gigQueries,
  createUser,
  findUser,
  findAllUser,
  getPassword,
  updateUser,
  createOrder,
};

module.exports = dbStoreHandler;
