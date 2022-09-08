import {
  filterCharacters,
  filterCharactersByNameWords,
  filterCharactersByTagLabels,
} from './filter-characters';
import { SearchTarget } from './search-target';
import { TaggedCharacter } from './tagged-character';

describe('filterCharactersByTagLabels', () => {
  const testTag1 = 'aurum';
  const testTag2 = 'borium';
  const alpha: TaggedCharacter = {
    name: '',
    tags: [
      { category: '', label: testTag1 },
      { category: '', label: 'other-tag' },
      { category: '', label: testTag2 },
    ],
    showDefault: true,
  };
  const beta: TaggedCharacter = {
    name: '',
    tags: [
      { category: '', label: 'other-tag' },
      { category: '', label: testTag1 },
    ],
    showDefault: true,
  };
  const gamma: TaggedCharacter = {
    name: '',
    tags: [
      { category: '', label: testTag1 },
      { category: '', label: testTag2 },
    ],
    showDefault: false,
  };
  const delta: TaggedCharacter = {
    name: '',
    tags: [{ category: '', label: 'other-tag' }],
    showDefault: true,
  };
  const epsilon: TaggedCharacter = {
    name: 'epsilon',
    tags: [{ category: '', label: testTag2 }],
    showDefault: false,
  };
  const characters = [alpha, beta, gamma, delta, epsilon];

  describe('全キャラ表示フラグがtrueの場合', () => {
    describe('指定タグが1つの場合', () => {
      it('指定タグを持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, [testTag1], true)
        ).toStrictEqual([alpha, beta, gamma]);
      });
    });

    describe('指定タグが複数の場合', () => {
      it('指定タグを全て持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, [testTag1, testTag2], true)
        ).toStrictEqual([alpha, gamma]);
      });
    });

    describe('マイナス指定がある場合', () => {
      it('そのタグを含まないキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, [`-${testTag1}`], true)
        ).toEqual([delta, epsilon]);
      });
    });

    describe('指定したタグを持つキャラクターがいない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, ['not-set-tag'], true)
        ).toStrictEqual([]);
      });
    });

    describe('タグ指定がない場合', () => {
      it('元の配列が返る', () => {
        expect(filterCharactersByTagLabels(characters, [], true)).toStrictEqual(
          characters
        );
      });
    });
  });

  describe('全キャラ表示フラグがfalseの場合', () => {
    describe('指定タグが1つの場合', () => {
      it('デフォルト表示され指定タグを全て持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, [testTag1], false)
        ).toStrictEqual([alpha, beta]);
      });
    });

    describe('指定タグが複数の場合', () => {
      it('デフォルト表示され指定タグを全て持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, [testTag1, testTag2], false)
        ).toStrictEqual([alpha]);
      });
    });

    describe('マイナス指定がある場合', () => {
      it('そのタグを含まないキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, [`-${testTag1}`], false)
        ).toEqual([delta]);
      });
    });

    describe('指定したタグを持つキャラクターがいない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, ['not-set-tag'], true)
        ).toStrictEqual([]);
      });
    });

    describe('タグ指定がない場合', () => {
      it('デフォルト表示されるキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTagLabels(characters, [], false)
        ).toStrictEqual([alpha, beta, delta]);
      });
    });
  });
});

describe('searchCharactersByCharacterNameWords', () => {
  const alpha: TaggedCharacter = {
    name: 'X-rayYankee',
    tags: [],
    showDefault: true,
  };
  const beta: TaggedCharacter = {
    name: 'ZuluX-ray',
    tags: [],
    showDefault: true,
  };
  const gamma: TaggedCharacter = {
    name: 'X-rayOtherYankee',
    tags: [],
    showDefault: false,
  };
  const delta: TaggedCharacter = {
    name: 'Other',
    tags: [],
    showDefault: true,
  };
  const characters = [alpha, beta, gamma, delta];

  describe('全キャラ表示フラグがtrueの場合', () => {
    describe('キーワードが1つの場合', () => {
      it('キーワードを名前に含むキャラクターの配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['X-ray'], true)
        ).toStrictEqual([alpha, beta, gamma]);
      });
    });

    describe('キーワードが複数の場合', () => {
      it('キーワードを全て名前に含むキャラクターの配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['X-ray', 'Yankee'], true)
        ).toStrictEqual([alpha, gamma]);
      });
    });

    describe('マイナス指定がある場合', () => {
      it('そのタグを含まないキャラクターの配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['-Zulu'], true)
        ).toEqual([alpha, gamma, delta]);
      });
    });

    describe('キーワードがヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['not-included-word'], true)
        ).toStrictEqual([]);
      });
    });

    describe('キーワード指定がない場合', () => {
      it('元の配列が返る', () => {
        expect(filterCharactersByNameWords(characters, [], true)).toStrictEqual(
          characters
        );
      });
    });
  });

  describe('全キャラ表示フラグがfalseの場合', () => {
    describe('キーワードが1つの場合', () => {
      it('キーワードを名前に含むキャラクターの配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['X-ray'], false)
        ).toStrictEqual([alpha, beta]);
      });
    });

    describe('キーワードが複数の場合', () => {
      it('キーワードを全て名前に含むキャラクターの配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['X-ray', 'Yankee'], false)
        ).toStrictEqual([alpha]);
      });
    });

    describe('マイナス指定がある場合', () => {
      it('そのタグを含まないキャラクターの配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['-Zulu'], false)
        ).toEqual([alpha, delta]);
      });
    });

    describe('キーワードがヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, ['not-included-word'], false)
        ).toStrictEqual([]);
      });
    });

    describe('キーワード指定がない場合', () => {
      it('デフォルト表示されるキャラクターの配列が返る', () => {
        expect(
          filterCharactersByNameWords(characters, [], false)
        ).toStrictEqual([alpha, beta, delta]);
      });
    });
  });
});

describe('filterCharacters', () => {
  const characterWithTag = {
    name: '',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  };
  const characterWithName = {
    name: 'name',
    tags: [],
    showDefault: true,
  };
  const characters = [characterWithTag, characterWithName];

  describe('検索対象がタグの場合', () => {
    const searchTarget = SearchTarget.TAG;

    it('タグ検索の結果が返る', () => {
      expect(
        filterCharacters(characters, searchTarget, ['label'], false)
      ).toEqual([characterWithTag]);
    });
  });

  describe('検索対象が名前の場合', () => {
    const searchTarget = SearchTarget.NAME;

    it('名前検索の結果が返る', () => {
      expect(
        filterCharacters(characters, searchTarget, ['name'], false)
      ).toEqual([characterWithName]);
    });
  });
});
