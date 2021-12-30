'use strict';

require('dotenv').config();

const config = {
  development: {
    mongoDb: process.env.DB_URL,
    port: process.env.PORT || 3001,
    saltRound: process.env.SALTROUND,
    jwt: {
      secret: process.env.JWT_SECRET,
      resetsecret: process.env.JWT_SECRET_RESET,
      expiresIn: process.env.EXPIRESIN,
      resetexpiresIn: process.env.RESETEXPIRESIN,
    },
    reactUrl: process.env.REACT_APP_URL,
    serverUrl: process.env.SERVER_URL,
    apiUrl: process.env.API_URL,
    homeMail: process.env.HOME_MAIL,
    homeMailPassword: process.env.HOME_MAIL_PASSWORD,
    emailServiceProvider: process.env.EMAIL_SERVICE_PROVIDER,
  },
};

const appSettings = { ...config['development'] };

module.exports = appSettings;
