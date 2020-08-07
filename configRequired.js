/**
 * Determines if all config is required or if no validation should be performed.
 *
 * @returns {Boolean}
 */
module.exports = () => (
  (process.env.NO_REQUIRE_CONFIG || '').toLowerCase() !== 'true'
);
