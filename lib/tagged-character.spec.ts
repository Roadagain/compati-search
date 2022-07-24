import { searchCharactersByTag, TaggedCharacter } from './tagged-character';

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
      expect(searchCharactersByTag(characters, 'not-set-tag')).toStrictEqual([]);
    });
  });
});
