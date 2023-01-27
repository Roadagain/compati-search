import { isTag, isTaggedCharacter, TaggedCharacter } from './tagged-character';

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
  const baseObj: TaggedCharacter = {
    id: 123,
    name: 'Name',
    kana: 'Name',
    tags: [
      { category: 'alpha', label: 'test1' },
      { category: 'beta', label: 'test2' },
    ],
    showDefault: false,
  };

  describe('データ形式が正しい場合', () => {
    it('trueが返る', () => {
      const obj = {
        ...baseObj,
      };
      expect(isTaggedCharacter(obj)).toBeTruthy();
    });
  });

  describe('idがnumberでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        ...baseObj,
        id: '123',
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('nameがstringでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        ...baseObj,
        name: 1,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('kanaがstringでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        ...baseObj,
        kana: 2,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列でない場合', () => {
    it('falseが返る', () => {
      const obj = {
        ...baseObj,
        tags: {},
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('tagsが配列かつTagでないオブジェクトを含む場合', () => {
    it('falseが返る', () => {
      const obj = {
        ...baseObj,
        tags: [{ category: 'alpha', label: 'test1' }, {}],
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });

  describe('showDefaultがbooleanでない場合', () => {
    it('falseが返る', () => {
      const obj = {
        ...baseObj,
        showDefault: 1,
      };
      expect(isTaggedCharacter(obj)).toBeFalsy();
    });
  });
});
