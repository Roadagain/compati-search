import {
  generateAutocompleteOptions,
  isOptionEqualToWord,
} from './autocomplete';
import { SearchType } from './search-target';
import { Ship } from './ship';

describe('generateAutocompleteOptions', () => {
  const ships: Ship[] = [
    {
      id: 1,
      name: 'Alpha',
      kana: 'Alpha',
      tags: [
        { category: 'X', label: 'x-ray' },
        { category: 'Y', label: 'yankee' },
      ],
      showDefault: true,
    },
    {
      id: 22,
      name: 'Beta',
      kana: 'Beta',
      tags: [{ category: 'X', label: 'x-ray' }],
      showDefault: true,
    },
    {
      id: 333,
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
            ships,
            { type: SearchType.TAG, category: 'X' },
            true
          )
        ).toEqual(['x-ray', 'xanadu']);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(ships, { type: SearchType.NAME }, true)
        ).toEqual(['Alpha', 'Beta', 'Gamma']);
      });
    });

    describe('検索対象がタグカテゴリの場合', () => {
      it('指定されたカテゴリのタグ一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(
            ships,
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
            ships,
            { type: SearchType.TAG, category: 'X' },
            false
          )
        ).toEqual(['x-ray']);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('デフォルト表示キャラの名前の一覧を返す', () => {
        expect(
          generateAutocompleteOptions(ships, { type: SearchType.NAME }, false)
        ).toEqual(['Alpha', 'Beta']);
      });
    });

    describe('検索対象がタグカテゴリの場合', () => {
      it('デフォルト表示キャラの指定されたカテゴリのタグ一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(
            ships,
            { type: SearchType.TAG, category: 'X' },
            false
          )
        ).toEqual(['x-ray']);
      });
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
