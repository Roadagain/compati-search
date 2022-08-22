import { generateAutocompleteOptions, uniqueAndSortTags } from './autocomplete';
import { SearchTarget } from './search-target';
import { Tag, TaggedCharacter } from './tagged-character';

describe('uniqueAndSortTags', () => {
  const tags: Tag[] = [
    {
      category: 'alpha',
      label: 'あるは',
    },
    {
      category: 'beta',
      label: 'べた',
    },
    {
      category: 'alpha',
      label: 'あるふあ',
    },
    {
      category: 'alpha',
      label: 'あるは',
    },
  ];

  it('重複を除き文字コード順にソートしたタグの一覧が返る', () => {
    expect(uniqueAndSortTags(tags)).toEqual([
      {
        category: 'alpha',
        label: 'あるは',
      },
      {
        category: 'alpha',
        label: 'あるふあ',
      },
      {
        category: 'beta',
        label: 'べた',
      },
    ]);
  });
});

describe('generateAutocompleteOptions', () => {
  const characters: TaggedCharacter[] = [
    {
      name: 'Alpha',
      tags: [
        { category: 'X', label: 'x-ray' },
        { category: 'Y', label: 'yankee' },
      ],
      showDefault: true,
    },
    {
      name: 'Beta',
      tags: [{ category: 'X', label: 'x-ray' }],
      showDefault: true,
    },
    {
      name: 'Gamma',
      tags: [{ category: 'Z', label: 'zulu' }],
      showDefault: false,
    },
  ];

  describe('全キャラが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグの一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.TAG, true)
        ).toEqual([
          { category: 'X', label: 'x-ray' },
          { category: 'Y', label: 'yankee' },
          { category: 'Z', label: 'zulu' },
        ]);
      });
    });

    describe('検索対象がタグの場合', () => {
      it('名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.NAME, true)
        ).toEqual([{ label: 'Alpha' }, { label: 'Beta' }, { label: 'Gamma' }]);
      });
    });
  });

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('デフォルト表示キャラのタグの一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.TAG, false)
        ).toEqual([
          { category: 'X', label: 'x-ray' },
          { category: 'Y', label: 'yankee' },
        ]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('デフォルト表示キャラの名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.NAME, false)
        ).toEqual([{ label: 'Alpha' }, { label: 'Beta' }]);
      });
    });
  });
});
