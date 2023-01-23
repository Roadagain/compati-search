import { isCharactersData } from './characters-data';
import { isTaggedCharacter, TaggedCharacter } from './tagged-character';

jest.mock('./tagged-character');
describe('isCharactersData', () => {
  describe('charactersが配列の場合', () => {
    const obj = {
      characters: [{} as TaggedCharacter],
    };

    describe('isTaggedCharacterがtrueを返す場合', () => {
      beforeEach(() => {
        (isTaggedCharacter as unknown as jest.Mock).mockReturnValue(true);
      });

      it('trueを返す', () => {
        expect(isCharactersData(obj)).toBeTruthy();
      });
    });

    describe('isTaggedCharacterがfalseを返す場合', () => {
      beforeEach(() => {
        (isTaggedCharacter as unknown as jest.Mock).mockReturnValue(false);
      });

      it('falseを返す', () => {
        expect(isCharactersData(obj)).toBeFalsy();
      });
    });
  });

  describe('charactersが配列でない場合', () => {
    it('falseを返す', () => {
      const obj = {
        characters: {},
      };
      expect(isCharactersData(obj)).toBeFalsy();
    });
  });
});
