import {
  filterCharacters,
  filterCharactersByNameWords,
  filterCharactersByTagLabels,
  matchesNameWords,
  matchesTagWords,
} from './filter-characters';
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

describe('matchesNameWords', () => {
  describe('ワードが1つの場合', () => {
    it('ワードを含むかどうか返る', () => {
      const words = ['na'];
      expect(matchesNameWords('name', words)).toBeTruthy();
      expect(matchesNameWords('other', words)).toBeFalsy();
    });
  });

  describe('ワードが複数の場合', () => {
    it('全てのワードを含むかどうか返る', () => {
      const words = ['name', 'second'];
      expect(matchesNameWords('name_second', words)).toBeTruthy();
      expect(matchesNameWords('name', words)).toBeFalsy();
      expect(matchesNameWords('second', words)).toBeFalsy();
    });
  });
});

describe('matchesTagWords', () => {
  describe('ワードが1つの場合', () => {
    it('ワードに完全一致するかどうか返る', () => {
      const words = ['tag'];
      expect(
        matchesTagWords([{ category: '', label: 'tag' }], words)
      ).toBeTruthy();
      expect(
        matchesTagWords([{ category: '', label: 'taga' }], words)
      ).toBeFalsy();
    });
  });

  describe('ワードが複数の場合', () => {
    it('全てのワードがタグ一覧に完全一致するかどうか返る', () => {
      const words = ['tag', 'second'];
      expect(
        matchesTagWords(
          [
            { category: '', label: 'tag' },
            { category: '', label: 'second' },
          ],
          words
        )
      ).toBeTruthy();
      expect(
        matchesTagWords(
          [
            { category: '', label: 'second' },
            { category: '', label: 'first' },
          ],
          words
        )
      ).toBeFalsy();
      expect(
        matchesTagWords([{ category: '', label: 'tag' }], words)
      ).toBeFalsy();
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
  const characterWithNameAndTag = {
    name: 'name2',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  };
  const hiddenCharacterWithNameAndTag = {
    name: 'name_hidden',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: false,
  };
  const characters = [
    characterWithTag,
    characterWithName,
    characterWithNameAndTag,
    hiddenCharacterWithNameAndTag,
  ];

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: [], tag: ['label'] }, false)
        ).toEqual([characterWithTag, characterWithNameAndTag]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: ['name'], tag: [] }, false)
        ).toEqual([characterWithName, characterWithNameAndTag]);
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterCharacters(
            characters,
            { name: ['name'], tag: ['label'] },
            false
          )
        ).toEqual([characterWithNameAndTag]);
      });
    });
  });

  describe('全キャラが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: [], tag: ['label'] }, true)
        ).toEqual([
          characterWithTag,
          characterWithNameAndTag,
          hiddenCharacterWithNameAndTag,
        ]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: ['name'], tag: [] }, true)
        ).toEqual([
          characterWithName,
          characterWithNameAndTag,
          hiddenCharacterWithNameAndTag,
        ]);
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterCharacters(characters, { name: ['name'], tag: ['label'] }, true)
        ).toEqual([characterWithNameAndTag, hiddenCharacterWithNameAndTag]);
      });
    });
  });
});
