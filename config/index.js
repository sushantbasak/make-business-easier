'use strict';

const config = {
  development: {
    mongoDb: 'mongodb://127.0.0.1:27017/bussiness-api',
    port: process.env.PORT || 8001,
  },
};

const appSettings = { ...config[process.env.NODE_ENV || 'development'] };

module.exports = appSettings;
