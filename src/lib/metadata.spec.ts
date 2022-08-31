import { isMetadata } from './metadata';

describe('isMetadata', () => {
  describe('オブジェクトの形式がMetadataに沿う場合', () => {
    it('trueが返る', () => {
      const obj = {
        character: 'キャラクター',
      };
      expect(isMetadata(obj)).toBeTruthy();
    });
  });

  describe('characterが文字列でない場合', () => {
    it('falseが返る', () => {
      const obj = {
        character: 1,
      };
      expect(isMetadata(obj)).toBeFalsy();
    });
  });
});
