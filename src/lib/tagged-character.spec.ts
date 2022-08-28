import {
  filterCharactersByTagLabels,
  TaggedCharacter,
  filterCharactersByNameWords,
  Tag,
  groupTagsByCategory,
} from './tagged-character';

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
  const characters = [alpha, beta, gamma, delta];

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

describe('groupTagsByCategory', () => {
  const beetle: Tag = { category: 'カテゴリーA', label: 'カブトムシ' };
  const stagBeetle: Tag = { category: 'カテゴリーA', label: 'クワガタムシ' };
  const peacock: Tag = { category: 'カテゴリーJ', label: 'クジャク' };
  const tiger: Tag = { category: 'カテゴリーQ', label: 'トラ' };
  const tags = [beetle, stagBeetle, peacock, tiger];

  it('カテゴリーごとにグルーピングされたタグの一覧が返る', () => {
    expect(groupTagsByCategory(tags)).toEqual([
      {
        category: 'カテゴリーA',
        tags: [beetle, stagBeetle],
      },
      {
        category: 'カテゴリーJ',
        tags: [peacock],
      },
      {
        category: 'カテゴリーQ',
        tags: [tiger],
      },
    ]);
  });
});
