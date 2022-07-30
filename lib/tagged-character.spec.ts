import {
  sortCharactersByTags,
  filterCharactersByTags,
  TaggedCharacter,
  filterCharactersByNameWords,
} from './tagged-character';

describe('filterCharactersByTag', () => {
  const testTag1 = 'aurum';
  const testTag2 = 'borium';
  const alpha: TaggedCharacter = {
    name: 'alpha',
    tags: new Set([testTag1, 'other-tag', testTag2]),
  };
  const beta: TaggedCharacter = {
    name: 'beta',
    tags: new Set(['other-tag', testTag2]),
  };
  const gamma: TaggedCharacter = {
    name: 'gamma',
    tags: new Set([testTag1]),
  };
  const delta: TaggedCharacter = {
    name: 'delta',
    tags: new Set(['other-tag']),
  };
  const characters = [alpha, beta, gamma, delta];

  describe('指定タグが1つの場合', () => {
    it('指定タグを全て持つキャラクターの配列が返る', () => {
      expect(filterCharactersByTags(characters, [testTag1])).toStrictEqual([
        alpha,
        gamma,
      ]);
    });
  });

  describe('指定タグが複数の場合', () => {
    it('指定タグを全て持つキャラクターの配列が返る', () => {
      expect(
        filterCharactersByTags(characters, [testTag1, testTag2])
      ).toStrictEqual([alpha]);
    });
  });

  describe('指定したタグを持つキャラクターがいない場合', () => {
    it('空配列が返る', () => {
      expect(filterCharactersByTags(characters, ['not-set-tag'])).toStrictEqual(
        []
      );
    });
  });

  describe('タグ指定がない場合', () => {
    it('元の配列が返る', () => {
      expect(filterCharactersByTags(characters, [])).toStrictEqual(characters);
    });
  });
});

describe('sortCharactersByTags', () => {
  const testTag1 = 'x-ray';
  const testTag2 = 'yankee';
  const testTag3 = 'zulu';
  const alpha: TaggedCharacter = {
    name: 'alpha',
    tags: new Set([testTag1, 'other-tag', testTag2]),
  };
  const beta: TaggedCharacter = {
    name: 'beta',
    tags: new Set(['other-tag', testTag1]),
  };
  const gamma: TaggedCharacter = {
    name: 'gamma',
    tags: new Set([testTag3, testTag2, testTag1]),
  };
  const delta: TaggedCharacter = {
    name: 'delta',
    tags: new Set(['other-tag']),
  };
  const characters = [alpha, beta, gamma, delta];

  describe('タグがヒットする場合', () => {
    it('ヒットしたタグが多い順にキャラクターの配列が返る', () => {
      expect(
        sortCharactersByTags(characters, [testTag1, testTag2, testTag3])
      ).toStrictEqual([gamma, alpha, beta, delta]);
    });
  });

  describe('指定したタグを持つキャラクターがいない場合', () => {
    it('元の配列が返る', () => {
      expect(sortCharactersByTags(characters, ['not-set-tag'])).toStrictEqual(
        characters
      );
    });
  });

  describe('タグが指定されない場合', () => {
    it('元の配列が返る', () => {
      expect(sortCharactersByTags(characters, [])).toStrictEqual(characters);
    });
  });
});

describe('searchCharactersByCharacterNameWords', () => {
  const alpha: TaggedCharacter = {
    name: 'X-rayYankee',
    tags: new Set(),
  };
  const beta: TaggedCharacter = {
    name: 'Zulu',
    tags: new Set(),
  };
  const gamma: TaggedCharacter = {
    name: 'X-rayOther',
    tags: new Set(),
  };
  const delta: TaggedCharacter = {
    name: 'Other',
    tags: new Set(),
  };
  const characters = [alpha, beta, gamma, delta];

  describe('キーワードが1つの場合', () => {
    it('キーワードを名前に含むキャラクターの配列が返る', () => {
      expect(filterCharactersByNameWords(characters, ['X-ray'])).toStrictEqual([
        alpha,
        gamma,
      ]);
    });
  });

  describe('キーワードが複数の場合', () => {
    it('キーワードを全て名前に含むキャラクターの配列が返る', () => {
      expect(
        filterCharactersByNameWords(characters, ['X-ray', 'Yankee'])
      ).toStrictEqual([alpha]);
    });
  });

  describe('キーワードがヒットしない場合', () => {
    it('空配列が返る', () => {
      expect(
        filterCharactersByNameWords(characters, ['not-included-word'])
      ).toStrictEqual([]);
    });
  });

  describe('キーワード指定がない場合', () => {
    it('元の配列が返る', () => {
      expect(filterCharactersByNameWords(characters, [])).toStrictEqual(
        characters
      );
    });
  });
});
