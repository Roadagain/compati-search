import {
  generateSearchTargets,
  getKeyOfSearchTarget,
  getLabelOfSearchTarget,
  SearchType,
} from './search-target';
import { Tag } from './ship';

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

describe('getLabelOfSearchTarget', () => {
  describe('検索対象が名前のとき', () => {
    it('「名前」が返る', () => {
      expect(getLabelOfSearchTarget({ type: SearchType.NAME })).toBe('名前');
    });
  });
  describe('検索対象がタグカテゴリのとき', () => {
    it('カテゴリ名が返る', () => {
      expect(
        getLabelOfSearchTarget({ type: SearchType.TAG, category: 'category' })
      ).toBe('category');
    });
  });
});

describe('generateSearchTargets', () => {
  describe('タグが1つ以上ある場合', () => {
    const tags: Tag[] = [
      {
        label: '駆逐艦',
        category: '艦種',
      },
      {
        label: '高速',
        category: '速力',
      },
      {
        label: '低速',
        category: '速力',
      },
    ];

    it('名前検索とタグカテゴリごとの検索が重複なく含まれる', () => {
      const searchTargets = generateSearchTargets(tags);
      expect(searchTargets).toStrictEqual([
        {
          type: SearchType.NAME,
        },
        {
          type: SearchType.TAG,
          category: '艦種',
        },
        {
          type: SearchType.TAG,
          category: '速力',
        },
      ]);
    });
  });
});
