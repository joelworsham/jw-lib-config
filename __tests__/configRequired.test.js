const configRequired = require('../configRequired');

describe('when NO_REQUIRE_CONFIG is not set', () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, {});
  });

  it('returns true', () => {
    expect(configRequired()).toBe(true);
  });
});


describe('when NO_REQUIRE_CONFIG is set', () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, {
      NO_REQUIRE_CONFIG: true
    });
  });

  it('returns false', () => {
    expect(configRequired()).toBe(false);
  })
});
