import { isCharactersData } from './characters-data';
import { isMetadata } from './metadata';
import { isTaggedCharacter, TaggedCharacter } from './tagged-character';

jest.mock('./tagged-character');
jest.mock('./metadata');
describe('isCharactersData', () => {
  describe('charactersが配列でmetadataがdefinedの場合', () => {
    const obj = {
      characters: [{} as TaggedCharacter],
      metadata: {},
    };

    describe('isTaggedCharacterとisMetadataの両方がtrueを返す場合', () => {
      beforeEach(() => {
        (isTaggedCharacter as unknown as jest.Mock).mockReturnValue(true);
        (isMetadata as unknown as jest.Mock).mockReturnValue(true);
      });

      it('trueを返す', () => {
        expect(isCharactersData(obj)).toBeTruthy();
      });
    });

    describe('isTaggedCharacterがfalseを返す場合', () => {
      beforeEach(() => {
        (isTaggedCharacter as unknown as jest.Mock).mockReturnValue(false);
        (isMetadata as unknown as jest.Mock).mockReturnValue(true);
      });

      it('falseを返す', () => {
        expect(isCharactersData(obj)).toBeFalsy();
      });
    });

    describe('isMetadataがfalseを返す場合', () => {
      beforeEach(() => {
        (isTaggedCharacter as unknown as jest.Mock).mockReturnValue(true);
        (isMetadata as unknown as jest.Mock).mockReturnValue(false);
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
        metadata: {},
      };
      expect(isCharactersData(obj)).toBeFalsy();
    });
  });

  describe('metadataがundefinedの場合', () => {
    it('falseを返す', () => {
      const obj = {
        characters: [],
        metadata: undefined,
      };
      expect(isCharactersData(obj)).toBeFalsy();
    });
  });
});
