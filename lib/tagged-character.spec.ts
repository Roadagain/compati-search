import {
  searchCharactersByMultipleTags,
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

describe('searchCharactersByMultipleTags', () => {
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

  describe('複数タグがヒットする場合', () => {
    it('ヒットしたタグが多い順にキャラクターの配列が返る', () => {
      expect(
        searchCharactersByMultipleTags(characters, [
          testTag1,
          testTag2,
          testTag3,
        ])
      ).toStrictEqual([gamma, alpha, beta]);
    });
  });

  describe('指定タグが1つの場合', () => {
    it('searchCharactersByTagと結果が一致する', () => {
      expect(
        searchCharactersByMultipleTags(characters, [testTag1])
      ).toStrictEqual(searchCharactersByTag(characters, testTag1));
    });
  });

  describe('指定したタグを持つキャラクターがいない場合', () => {
    it('空配列が返る', () => {
      expect(
        searchCharactersByMultipleTags(characters, ['not-set-tag'])
      ).toStrictEqual([]);
    });
  });

  describe('タグが指定されない場合', () => {
    it('空配列が返る', () => {
      expect(searchCharactersByMultipleTags(characters, [])).toStrictEqual([]);
    });
  });
});
