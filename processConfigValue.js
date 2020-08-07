/**
 * Processes a configuration value, typecasting it as necessary.
 *
 * @param {String} value Configuration value to process
 * @returns {Boolean|Number|String}
 */
module.exports = (value) => {
  if (['0', 'false'].includes(value)) return false;
  if (['1', 'true'].includes(value)) return true;
  if (/^[0-9]$/.test(value)) return parseInt(value, 10);
  return value;
};
