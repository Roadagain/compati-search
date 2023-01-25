import {
  generateAutocompleteOptions,
  isOptionEqualToWord,
  uniqueAndSortTagLabels,
  wordWithoutFirstMinus,
} from './autocomplete';
import { SearchType } from './search-target';
import { TaggedCharacter } from './tagged-character';

describe('uniqueAndSortTags', () => {
  const tagLabels: string[] = ['あるは', 'べた', 'あるふあ', 'あるは'];

  it('重複を除き文字コード順にソートしたタグの一覧が返る', () => {
    expect(uniqueAndSortTagLabels(tagLabels)).toEqual([
      'あるは',
      'あるふあ',
      'べた',
    ]);
  });
});

describe('generateAutocompleteOptions', () => {
  const characters: TaggedCharacter[] = [
    {
      name: 'Alpha',
      kana: 'Alpha',
      tags: [
        { category: 'X', label: 'x-ray' },
        { category: 'Y', label: 'yankee' },
      ],
      showDefault: true,
    },
    {
      name: 'Beta',
      kana: 'Beta',
      tags: [{ category: 'X', label: 'x-ray' }],
      showDefault: true,
    },
    {
      name: 'Gamma',
      kana: 'Gamma',
      tags: [
        { category: 'Z', label: 'zulu' },
        { category: 'X', label: 'xanadu' },
      ],
      showDefault: false,
    },
  ];

  describe('全キャラが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグの一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(
            characters,
            { type: SearchType.TAG, category: 'X' },
            true
          )
        ).toEqual(['x-ray', 'xanadu']);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(
            characters,
            { type: SearchType.NAME },
            true
          )
        ).toEqual(['Alpha', 'Beta', 'Gamma']);
      });
    });

    describe('検索対象がタグカテゴリの場合', () => {
      it('指定されたカテゴリのタグ一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(
            characters,
            { type: SearchType.TAG, category: 'X' },
            true
          )
        ).toEqual(['x-ray', 'xanadu']);
      });
    });
  });

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('デフォルト表示キャラのタグの一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(
            characters,
            { type: SearchType.TAG, category: 'X' },
            false
          )
        ).toEqual(['x-ray']);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('デフォルト表示キャラの名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(
            characters,
            { type: SearchType.NAME },
            false
          )
        ).toEqual(['Alpha', 'Beta']);
      });
    });

    describe('検索対象がタグカテゴリの場合', () => {
      it('デフォルト表示キャラの指定されたカテゴリのタグ一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(
            characters,
            { type: SearchType.TAG, category: 'X' },
            false
          )
        ).toEqual(['x-ray']);
      });
    });
  });
});

describe('wordWithoutFirstMins', () => {
  describe('ワードがマイナス(-)から始まる場合', () => {
    it('最初のマイナスを除いたワードを返す', () => {
      const word = '-word';
      expect(wordWithoutFirstMinus(word)).toBe('word');
    });
  });

  describe('ワードがマイナス(-)以外から始まる場合', () => {
    it('ワードをそのまま返す', () => {
      const word = '+word';
      expect(wordWithoutFirstMinus(word)).toBe(word);
    });
  });

  describe('ワードが空文字列の場合', () => {
    it('空文字列を返す', () => {
      const word = '';
      expect(wordWithoutFirstMinus(word)).toBe('');
    });
  });
});

describe('isOptionEqualToWord', () => {
  describe('最初のマイナス(-)を除いてラベルとワードが一致する場合', () => {
    describe.each`
      option     | word
      ${'test'}  | ${'test'}
      ${'test'}  | ${'-test'}
      ${'-test'} | ${'test'}
      ${'-test'} | ${'-test'}
    `('タグラベルが $label でワードが $word の場合', ({ option, word }) => {
      it('同じと判定される', () => {
        expect(isOptionEqualToWord(option, word)).toBeTruthy();
      });
    });
  });

  describe('最初のマイナス(-)を除いてもラベルとワードが一致しない場合', () => {
    describe.each`
      option      | word
      ${'label'}  | ${'word'}
      ${'label'}  | ${'-word'}
      ${'-label'} | ${'word'}
      ${'-label'} | ${'-word'}
    `('タグラベルが $label でワードが $word の場合', ({ option, word }) => {
      it('違うと判定される', () => {
        expect(isOptionEqualToWord(option, word)).toBeFalsy();
      });
    });
  });
});
