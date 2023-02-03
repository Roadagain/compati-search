import { getKeyOfSearchTarget, SearchType } from '.';

describe('getKeyOfSearchTarget', () => {
  describe('検索対象が名前のとき', () => {
    it('「name」が返る', () => {
      expect(getKeyOfSearchTarget({ type: SearchType.NAME })).toBe('name');
    });
  });
  describe('検索対象がタグカテゴリのとき', () => {
    it('カテゴリ名が返る', () => {
      expect(
        getKeyOfSearchTarget({ type: SearchType.TAG, category: 'category' })
      ).toBe('category');
    });
  });
});
