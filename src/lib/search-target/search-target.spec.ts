import { Tag } from '../ship';
import { generateSearchTargets, SearchType } from './search-target';

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
