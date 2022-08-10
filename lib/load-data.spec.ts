import {
  isTaggedCharacter,
  loadCharactersDataFromJson,
  loadSampleCharactersData,
} from './load-data';
import charactersData from '../sample/characters-data/sample.json';

describe('isTaggedCharacter', () => {
  describe('データ形式が正しい場合', () => {
    it('trueが返る', () => {
      const obj = {
        name: 'Name',
        tags: ['test1', 'test2'],
      };
      expect(isTaggedCharacter(obj)).toBeTruthy();
    });
  });

  describe('nameがstringでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 1,
        tags: ['test1', 'test2'],
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列でない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: 'aaa',
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列かつ文字列でない要素を含む場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: ['test1', 2],
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });
});

describe('loadCharactersDataFromJson', () => {
  describe('データ形式が正しい場合', () => {
    const json = [
      {
        name: 'Alpha',
        tags: ['one', 'two'],
      },
      {
        name: 'Beta',
        tags: [],
      },
    ];

    it('読み込んだキャラクターデータが返る', () => {
      expect(loadCharactersDataFromJson(json)).toEqual(json);
    });
  });

  describe('データ形式が不正な場合', () => {
    const json = [
      {
        name: 1,
        tags: ['one, two'],
      },
      {
        name: 'Beta',
        tags: ['three'],
      },
    ];

    it('エラーが返る', () => {
      expect(() => loadCharactersDataFromJson(json)).toThrowError(
        'Invalid characters data'
      );
    });
  });
});

describe('loadSampleCharactersData', () => {
  it('サンプルデータが返る', () => {
    expect(loadSampleCharactersData()).toStrictEqual(charactersData);
  });
});
