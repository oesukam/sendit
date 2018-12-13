import getPrice from '../../src/helpers/getPrice';

describe('getPrice()', () => {
  it('getPrice(10) return 10000', () => {
    expect(getPrice(10)).toBe(10 * 1000);
  });
  it('getPrice(51) return 45900', () => {
    expect(getPrice(51)).toBe(51 * 900);
  });
  it('getPrice(101) return 80800', () => {
    expect(getPrice(101)).toBe(101 * 800);
  });
});
