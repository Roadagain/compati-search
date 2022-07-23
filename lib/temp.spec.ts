import { sampleFunc } from './temp';

describe('sampleFunc', () => {
  it('a + bを返す', () => {
    expect(sampleFunc(1, 2)).toBe(3);
  });
});
