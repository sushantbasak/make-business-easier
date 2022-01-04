const express = require('express');
const boom = require('express-boom');
const bodyParser = require('body-parser');
const { isCelebrate } = require('celebrate');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
const { apiResponseGenerator } = require('../init/bootstrap');
const api = require('../api');
const { Gig, User, Order, Message } = require('../api/dbstore/mongo/schemas');

const middleware = async () => {
  const app = express();


  app.use(boom());
  app.use(fileUpload());

  // enable cross domain access
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, x-access-token, visitorid, tempsave'
    );
    next();
  });
  app.use(compression());

  // parse application/x-www-form-urlencoded
  app.use(
    bodyParser.urlencoded({
      extended: false,
      parameterLimit: 10000,
      limit: 1024 * 1024 * 10,
    })
  );

  // parse application/json
  app.use(bodyParser.json({ limit: '30mb' }));
  app.use(apiResponseGenerator);

  // connect to swagger UI
  app.use('/', swaggerUi.serve);
  app.get('/', swaggerUi.setup(swaggerDocument));

  // connect to api
  app.use('/api', api);
  app.use((err, req, res, next) => {
    if (isCelebrate(err)) {
      res.sendValidationError(err.message);
      return;
    }
    next();
  });

  return app;
};

module.exports = middleware;
