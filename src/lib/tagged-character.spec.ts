import {
  filterCharactersByTags,
  TaggedCharacter,
  filterCharactersByNameWords,
} from './tagged-character';

describe('filterCharactersByTag', () => {
  const testTag1 = 'aurum';
  const testTag2 = 'borium';
  const alpha: TaggedCharacter = {
    name: 'alpha',
    tags: [testTag1, 'other-tag', testTag2],
    showDefault: true,
  };
  const beta: TaggedCharacter = {
    name: 'beta',
    tags: ['other-tag', testTag1],
    showDefault: true,
  };
  const gamma: TaggedCharacter = {
    name: 'gamma',
    tags: [testTag1, testTag2],
    showDefault: false,
  };
  const delta: TaggedCharacter = {
    name: 'delta',
    tags: ['other-tag'],
    showDefault: true,
  };
  const characters = [alpha, beta, gamma, delta];

  describe('全キャラ表示フラグがtrueの場合', () => {
    describe('指定タグが1つの場合', () => {
      it('指定タグを持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTags(characters, [testTag1], true)
        ).toStrictEqual([alpha, beta, gamma]);
      });
    });

    describe('指定タグが複数の場合', () => {
      it('指定タグを全て持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTags(characters, [testTag1, testTag2], true)
        ).toStrictEqual([alpha, gamma]);
      });
    });

    describe('指定したタグを持つキャラクターがいない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharactersByTags(characters, ['not-set-tag'], true)
        ).toStrictEqual([]);
      });
    });

    describe('タグ指定がない場合', () => {
      it('元の配列が返る', () => {
        expect(filterCharactersByTags(characters, [], true)).toStrictEqual(
          characters
        );
      });
    });
  });

  describe('全キャラ表示フラグがfalseの場合', () => {
    describe('指定タグが1つの場合', () => {
      it('デフォルト表示され指定タグを全て持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTags(characters, [testTag1], false)
        ).toStrictEqual([alpha, beta]);
      });
    });

    describe('指定タグが複数の場合', () => {
      it('デフォルト表示され指定タグを全て持つキャラクターの配列が返る', () => {
        expect(
          filterCharactersByTags(characters, [testTag1, testTag2], false)
        ).toStrictEqual([alpha]);
      });
    });

    describe('指定したタグを持つキャラクターがいない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharactersByTags(characters, ['not-set-tag'], true)
        ).toStrictEqual([]);
      });
    });

    describe('タグ指定がない場合', () => {
      it('デフォルト表示されるキャラクターの配列が返る', () => {
        expect(filterCharactersByTags(characters, [], false)).toStrictEqual([
          alpha,
          beta,
          delta,
        ]);
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
