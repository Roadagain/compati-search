import {
  filterCharacters,
  matchesNameWords,
  matchesTagWords,
} from './filter-characters';

describe('matchesNameWords', () => {
  describe('ワードが1つの場合', () => {
    it('プラスワードを含むかどうか返る', () => {
      const words = ['na'];
      expect(matchesNameWords('name', words)).toBeTruthy();
      expect(matchesNameWords('other', words)).toBeFalsy();
    });

    it('マイナスワードを含まないかどうか返る', () => {
      const words = ['-na'];
      expect(matchesNameWords('name', words)).toBeFalsy();
      expect(matchesNameWords('other', words)).toBeTruthy();
    });
  });

  describe('ワードが複数の場合', () => {
    it('全てのプラスワードを含みマイナスワードを含まないか返る', () => {
      const words = ['name', 'second', '-first'];
      expect(matchesNameWords('name_second', words)).toBeTruthy();
      expect(matchesNameWords('name_first_second', words)).toBeFalsy();
      expect(matchesNameWords('second', words)).toBeFalsy();
    });
  });

  describe('ワードがない場合', () => {
    it('マッチする扱いになる', () => {
      expect(matchesNameWords('', [])).toBeTruthy();
    });
  });
});

describe('matchesTagWords', () => {
  describe('ワードが1つの場合', () => {
    it('プラスワードに完全一致するかどうか返る', () => {
      const words = ['tag'];
      expect(
        matchesTagWords([{ category: '', label: 'tag' }], words)
      ).toBeTruthy();
      expect(
        matchesTagWords([{ category: '', label: 'taga' }], words)
      ).toBeFalsy();
    });

    it('マイナスワードに完全一致しないかどうか返る', () => {
      const words = ['-tag'];
      expect(
        matchesTagWords([{ category: '', label: 'tag' }], words)
      ).toBeFalsy();
      expect(
        matchesTagWords([{ category: '', label: 'taga' }], words)
      ).toBeTruthy();
    });
  });

  describe('ワードが複数の場合', () => {
    it('全てのプラスワードがタグ一覧に完全一致し全てのマイナスワードがタグ一覧に完全一致しないか返る', () => {
      const words = ['tag', 'second', '-first'];
      expect(
        matchesTagWords(
          [
            { category: '', label: 'tag' },
            { category: '', label: 'second' },
          ],
          words
        )
      ).toBeTruthy();
      expect(
        matchesTagWords(
          [
            { category: '', label: 'tag' },
            { category: '', label: 'second' },
            { category: '', label: 'first' },
          ],
          words
        )
      ).toBeFalsy();
      expect(
        matchesTagWords([{ category: '', label: 'tag' }], words)
      ).toBeFalsy();
    });
  });

  describe('ワードがない場合', () => {
    it('マッチしたとして扱われる', () => {
      expect(matchesTagWords([], [])).toBeTruthy();
    });
  });
});

describe('filterCharacters', () => {
  const characterWithTag = {
    id: 1,
    name: '',
    kana: '',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  };
  const characterWithName = {
    id: 22,
    name: 'name',
    kana: 'name',
    tags: [],
    showDefault: true,
  };
  const characterWithNameAndTag = {
    id: 333,
    name: 'name2',
    kana: 'name2',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  };
  const hiddenCharacterWithNameAndTag = {
    id: 4444,
    name: 'name_hidden',
    kana: 'name_hidden',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: false,
  };
  const characters = [
    characterWithTag,
    characterWithName,
    characterWithNameAndTag,
    hiddenCharacterWithNameAndTag,
  ];

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: [], tag: ['label'] }, false)
        ).toEqual([characterWithTag, characterWithNameAndTag]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: ['name'], tag: [] }, false)
        ).toEqual([characterWithName, characterWithNameAndTag]);
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterCharacters(
            characters,
            { name: ['name'], tag: ['label'] },
            false
          )
        ).toEqual([characterWithNameAndTag]);
      });
    });

    describe('検索対象が設定されていない場合', () => {
      it('全てのデフォルト表示キャラが返る', () => {
        expect(
          filterCharacters(characters, { name: [], tag: [] }, false)
        ).toEqual(characters.filter(({ showDefault }) => showDefault));
      });
    });

    describe('検索にヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharacters(
            characters,
            { name: ['not-included-name'], tag: ['not-included-tag'] },
            false
          )
        ).toEqual([]);
      });
    });
  });

  describe('全キャラが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: [], tag: ['label'] }, true)
        ).toEqual([
          characterWithTag,
          characterWithNameAndTag,
          hiddenCharacterWithNameAndTag,
        ]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(
          filterCharacters(characters, { name: ['name'], tag: [] }, true)
        ).toEqual([
          characterWithName,
          characterWithNameAndTag,
          hiddenCharacterWithNameAndTag,
        ]);
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterCharacters(characters, { name: ['name'], tag: ['label'] }, true)
        ).toEqual([characterWithNameAndTag, hiddenCharacterWithNameAndTag]);
      });
    });

    describe('検索対象が設定されていない場合', () => {
      it('全キャラが返る', () => {
        expect(
          filterCharacters(characters, { name: [], tag: [] }, true)
        ).toEqual(characters);
      });
    });

    describe('検索にヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterCharacters(
            characters,
            { name: ['not-included-name'], tag: ['not-included-tag'] },
            true
          )
        ).toEqual([]);
      });
    });
  });
});
