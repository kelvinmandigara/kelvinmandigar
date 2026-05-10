const createApp = require('./app');
const config = require('./config');
const pool = require('./db/pool');
const CitizenService = require('./services/citizenService');
const GovernmentService = require('./services/governmentService');

const citizenService = new CitizenService(pool);
const governmentService = new GovernmentService(pool);

const app = createApp({
  citizenService,
  governmentService,
  corsOrigins: config.corsOrigins
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`ZimID API listening on ${config.port}`);
});
