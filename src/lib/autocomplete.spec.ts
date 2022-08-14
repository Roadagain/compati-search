import { generateAutoCompleteOptions } from './autocomplete';
import { SearchTarget } from './search-target';
import { TaggedCharacter } from './tagged-character';

describe('generateAutoCompleteOptions', () => {
  const characters: TaggedCharacter[] = [
    {
      name: 'Alpha',
      tags: ['x-ray', 'yankee'],
      showDefault: true,
    },
    {
      name: 'Beta',
      tags: ['x-ray', 'zulu'],
      showDefault: true,
    },
    {
      name: 'Gamma',
      tags: ['yankee'],
      showDefault: true,
    },
  ];

  describe('検索対象がタグの場合', () => {
    it('タグの一覧を重複なく返す', () => {
      expect(generateAutoCompleteOptions(characters, SearchTarget.TAG)).toEqual(
        ['x-ray', 'yankee', 'zulu']
      );
    });
  });

  describe('検索対象がタグの場合', () => {
    it('名前の一覧を返す', () => {
      expect(
        generateAutoCompleteOptions(characters, SearchTarget.NAME)
      ).toEqual(['Alpha', 'Beta', 'Gamma']);
    });
  });
});
