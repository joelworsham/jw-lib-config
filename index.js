const configRequired = require('./configRequired');
const buildConfig = require('./buildConfig');
const configSettings = require('../../config.json');

// Build config
const { config, errors } = buildConfig(configSettings);

// Validate config
if (configRequired() && errors.length) {
  // eslint-disable-next-line no-console
  console.error('Error building Sippable config from local ENV file. See errors below:');
  errors.forEach((error) => {
    // eslint-disable-next-line no-console
    console.log(`  - ${error}`);
  });
  process.exit(1);
}

module.exports = config;
