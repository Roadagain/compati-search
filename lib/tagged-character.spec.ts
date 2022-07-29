import {
  sortCharactersByTags,
  searchCharactersByTag,
  TaggedCharacter,
} from './tagged-character';

describe('searchCharactersByTag', () => {
  const testTag = 'test-tag';
  const alpha: TaggedCharacter = {
    name: 'alpha',
    tags: new Set([testTag, 'other-tag']),
  };
  const beta: TaggedCharacter = {
    name: 'beta',
    tags: new Set(['other-tag']),
  };
  const gamma: TaggedCharacter = {
    name: 'gamma',
    tags: new Set([testTag]),
  };
  const characters = [alpha, beta, gamma];

  describe('対象が存在する場合', () => {
    it('指定したタグを持つキャラクターの配列が返る', () => {
      expect(searchCharactersByTag(characters, testTag)).toStrictEqual([
        alpha,
        gamma,
      ]);
    });
  });

  describe('指定したタグを持つキャラクターがいない場合', () => {
    it('空配列が返る', () => {
      expect(searchCharactersByTag(characters, 'not-set-tag')).toStrictEqual(
        []
      );
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
      expect(
        sortCharactersByTags(characters, ['not-set-tag'])
      ).toStrictEqual(characters);
    });
  });

  describe('タグが指定されない場合', () => {
    it('元の配列が返る', () => {
      expect(sortCharactersByTags(characters, [])).toStrictEqual(
        characters
      );
    });
  });
});
