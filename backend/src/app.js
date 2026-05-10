const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const buildRouter = require('./routes');

function createApp({ citizenService, governmentService, corsOrigins }) {
  const app = express();
  const allowedOrigins = new Set(corsOrigins);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          return callback(null, true);
        }
        return callback(new Error('CORS origin not allowed'));
      }
    })
  );
  app.use(express.json({ limit: '1mb' }));

  app.use(buildRouter({ citizenService, governmentService }));

  app.use(errorHandler);

  return app;
}

module.exports = createApp;
