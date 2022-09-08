import { isTag, isTaggedCharacter } from './tagged-character';

describe('isTag', () => {
  describe('データ形式が正しい場合', () => {
    it('trueが返る', () => {
      const obj = {
        category: 'category',
        label: 'label',
      };
      expect(isTag(obj)).toBeTruthy();
    });
  });

  describe('categoryが文字列でない場合', () => {
    it('falseが返る', () => {
      const obj = {
        category: 5,
        label: 'label',
      };
      expect(isTag(obj)).toBeFalsy();
    });
  });

  describe('labelが文字列でない場合', () => {
    it('falseが返る', () => {
      const obj = {
        category: 'category',
        label: null,
      };
      expect(isTag(obj)).toBeFalsy();
    });
  });
});

describe('isTaggedCharacter', () => {
  describe('データ形式が正しい場合', () => {
    it('trueが返る', () => {
      const obj = {
        name: 'Name',
        tags: [
          { category: 'alpha', label: 'test1' },
          { category: 'beta', label: 'test2' },
        ],
        showDefault: false,
      };
      expect(isTaggedCharacter(obj)).toBeTruthy();
    });
  });

  describe('nameがstringでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 1,
        tags: [
          { category: 'alpha', label: 'test1' },
          { category: 'beta', label: 'test2' },
        ],
        showDefault: true,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列でない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: 'aaa',
        showDefault: true,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列かつTagでないオブジェクトを含む場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: [{ category: 'alpha', label: 'test1' }, {}],
        showDefault: false,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('showDefaultがbooleanでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        name: 'Name',
        tags: [
          { category: 'alpha', label: 'test1' },
          { category: 'beta', label: 'test2' },
        ],
        showDefault: 1,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });
});
