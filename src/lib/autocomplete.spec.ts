import {
  AutocompleteOption,
  filterOptionsByWord,
  generateAutocompleteOptions,
  isOptionEqualToWord,
  uniqueAndSortTags,
  wordWithoutFirstMinus,
} from './autocomplete';
import { SearchType } from './search-target';
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
            { type: SearchType.TAG },
            true
          )
        ).toEqual([
          { category: 'X', label: 'x-ray' },
          { category: 'X', label: 'xanadu' },
          { category: 'Y', label: 'yankee' },
          { category: 'Z', label: 'zulu' },
        ]);
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
        ).toEqual([{ label: 'Alpha' }, { label: 'Beta' }, { label: 'Gamma' }]);
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
        ).toEqual([
          { category: 'X', label: 'x-ray' },
          { category: 'X', label: 'xanadu' },
        ]);
      });
    });
  });

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('デフォルト表示キャラのタグの一覧を重複なく返す', () => {
        expect(
          generateAutocompleteOptions(
            characters,
            { type: SearchType.TAG },
            false
          )
        ).toEqual([
          { category: 'X', label: 'x-ray' },
          { category: 'Y', label: 'yankee' },
        ]);
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
        ).toEqual([{ label: 'Alpha' }, { label: 'Beta' }]);
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
        ).toEqual([{ category: 'X', label: 'x-ray' }]);
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
      option                | word
      ${'test'}             | ${'test'}
      ${'test'}             | ${'-test'}
      ${'-test'}            | ${'test'}
      ${'-test'}            | ${'-test'}
      ${{ label: 'test' }}  | ${'test'}
      ${{ label: 'test' }}  | ${'-test'}
      ${{ label: '-test' }} | ${'test'}
      ${{ label: '-test' }} | ${'-test'}
    `('タグラベルが $label でワードが $word の場合', ({ option, word }) => {
      it('同じと判定される', () => {
        expect(isOptionEqualToWord(option, word)).toBeTruthy();
      });
    });
  });

  describe('最初のマイナス(-)を除いてもラベルとワードが一致しない場合', () => {
    describe.each`
      option                 | word
      ${'label'}             | ${'word'}
      ${'label'}             | ${'-word'}
      ${'-label'}            | ${'word'}
      ${'-label'}            | ${'-word'}
      ${{ label: 'label' }}  | ${'word'}
      ${{ label: 'label' }}  | ${'-word'}
      ${{ label: '-label' }} | ${'word'}
      ${{ label: '-label' }} | ${'-word'}
    `('タグラベルが $label でワードが $word の場合', ({ option, word }) => {
      it('違うと判定される', () => {
        expect(isOptionEqualToWord(option, word)).toBeFalsy();
      });
    });
  });
});

describe('filterOptionsByWord', () => {
  const labels = ['First', 'Second', 'Third'];
  const plusOptions: AutocompleteOption[] = labels.map((label) => ({ label }));
  const minusOptions: AutocompleteOption[] = labels.map((label) => ({
    label: `-${label}`,
  }));

  describe.each`
    optionsCase   | options         | word
    ${'通常'}     | ${plusOptions}  | ${'ir'}
    ${'通常'}     | ${plusOptions}  | ${'-ir'}
    ${'マイナス'} | ${minusOptions} | ${'ir'}
    ${'マイナス'} | ${minusOptions} | ${'-ir'}
  `('補完候補が$optionsCaseでワードが $word の場合', ({ options, word }) => {
    // FirstとThirdがヒットする
    it('先頭のマイナス(-)を除いた状態でフィルタリングされる', () => {
      expect(filterOptionsByWord(options, word)).toEqual([
        options[0],
        options[2],
      ]);
    });
  });

  describe('ワードが空文字列の場合', () => {
    it('補完候補がそのまま返る', () => {
      expect(filterOptionsByWord(plusOptions, '')).toEqual(plusOptions);
      expect(filterOptionsByWord(minusOptions, '')).toEqual(minusOptions);
    });
  });
});
