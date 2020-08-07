const processConfigValue = require('../processConfigValue');

describe('Processing Config Values', () => {
  it('returns false when 0 or false', () => {
    expect(processConfigValue('0')).toBe(false)
    expect(processConfigValue('false')).toBe(false)
  });

  it('returns true when 1 or true', () => {
    expect(processConfigValue('1')).toBe(true)
    expect(processConfigValue('true')).toBe(true)
  });

  it('returns Integer type for any strings that match numbers', () => {
    expect(processConfigValue('4')).toBe(4);
  });

  it('returns the value if a String', () => {
    let val = 'some value';

    expect(processConfigValue(val)).toBe(val);
  });
});
