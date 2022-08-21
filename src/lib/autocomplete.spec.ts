import { generateAutocompleteOptions } from './autocomplete';
import { SearchTarget } from './search-target';
import { TaggedCharacter } from './tagged-character';

describe('generateAutocompleteOptions', () => {
  const characters: TaggedCharacter[] = [
    {
      name: 'Alpha',
      tags: ['x-ray', 'yankee'],
      showDefault: true,
    },
    {
      name: 'Beta',
      tags: ['x-ray'],
      showDefault: true,
    },
    {
      name: 'Gamma',
      tags: ['zulu'],
      showDefault: false,
    },
  ];

  describe('全キャラが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグの一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.TAG, true)
        ).toEqual(['x-ray', 'yankee', 'zulu']);
      });
    });

    describe('検索対象がタグの場合', () => {
      it('名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.NAME, true)
        ).toEqual(['Alpha', 'Beta', 'Gamma']);
      });
    });
  });

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('デフォルト表示キャラのタグの一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.TAG, false)
        ).toEqual(['x-ray', 'yankee']);
      });
    });

    describe('検索対象がタグの場合', () => {
      it('デフォルト表示キャラの名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(characters, SearchTarget.NAME, false)
        ).toEqual(['Alpha', 'Beta']);
      });
    });
  });
});
