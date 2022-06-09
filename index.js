/* eslint-disable no-console */
const dotenv = require('dotenv');
const appSettings = require('./config');

const middleware = require('./middleware');

dotenv.config();

middleware()
  .then((app) => app.listen(appSettings.port))
  .then(() => {
    console.log('Server started on port:', appSettings.port);
  })
  .catch((err) => {
    console.error('caught error', err);
  });
