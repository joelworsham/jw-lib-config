const processConfigValue = require('./processConfigValue');

const booleans = {
  true: ['true', 'yes', '1'],
  false: ['false', 'no', '0'],
};

/**
 * Takes a configSettings object, and gets all config variables from the node ENV.
 *
 * @param {Object} configSettings Config settings object
 * @returns {Object} Config object of key/value pairs for each
 */
module.exports = (configSettings) => (
  Object.entries(configSettings).reduce(
    ({ config, errors }, [key, configObject]) => {
      // Error if required and not set
      if (configObject.required && !(configObject.env in process.env)) {
        errors.push(`${configObject.env}: Not set and is required.`);
      }

      let configValue = process.env[configObject.env] || configObject.default;

      // Check type and cast
      if (configObject.env in process.env) {
        switch (configObject.type) {
          case 'String':
            if ([...booleans.true, ...booleans.false].includes(configValue)) {
              errors.push(`${configObject.env}: Invalid type. Should be of type "String".`);
            }
            break;
          case 'Number':
            if (!/^[0-9]+$/.test(configValue)) {
              errors.push(`${configObject.env}: Invalid type. Should be of type "Number".`);
            } else {
              configValue = parseInt(configValue, 10);
            }
            break;
          case 'Boolean':
            if (![...booleans.true, ...booleans.false].includes(configValue)) {
              errors.push(`${configObject.env}: Invalid type. Should be of type "Boolean".`);
            } else {
              configValue = booleans.true.includes(configValue);
            }
            break;
          default:
            errors.push(`${configObject.env}: Unknown type "${configObject.type}".`);
        }
      }

      return {
        config: {
          [key]: processConfigValue(configValue),
          ...config,
        },
        errors,
      };
    },
    { config: {}, errors: [] },
  )
);
