const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const buildRouter = require('./routes');

function createApp({ citizenService, governmentService, corsOrigin }) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: corsOrigin }));
  app.use(express.json({ limit: '1mb' }));

  app.use(buildRouter({ citizenService, governmentService, corsOrigin }));

  app.use(errorHandler);

  return app;
}

module.exports = createApp;
