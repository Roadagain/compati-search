import { filterShips, matchesNameWords, matchesTagWords } from './filter-ships';

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

describe('filterShips', () => {
  const shipWithTag = {
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
  const shipWithName = {
    id: 22,
    name: 'name',
    kana: 'name',
    tags: [],
    showDefault: true,
  };
  const shipWithNameAndTag = {
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
  const hiddenShipWithNameAndTag = {
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
  const ships = [
    shipWithTag,
    shipWithName,
    shipWithNameAndTag,
    hiddenShipWithNameAndTag,
  ];

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(filterShips(ships, { name: [], tag: ['label'] }, false)).toEqual(
          [shipWithTag, shipWithNameAndTag]
        );
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(filterShips(ships, { name: ['name'], tag: [] }, false)).toEqual([
          shipWithName,
          shipWithNameAndTag,
        ]);
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterShips(ships, { name: ['name'], tag: ['label'] }, false)
        ).toEqual([shipWithNameAndTag]);
      });
    });

    describe('検索対象が設定されていない場合', () => {
      it('全てのデフォルト表示キャラが返る', () => {
        expect(filterShips(ships, { name: [], tag: [] }, false)).toEqual(
          ships.filter(({ showDefault }) => showDefault)
        );
      });
    });

    describe('検索にヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterShips(
            ships,
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
        expect(filterShips(ships, { name: [], tag: ['label'] }, true)).toEqual([
          shipWithTag,
          shipWithNameAndTag,
          hiddenShipWithNameAndTag,
        ]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(filterShips(ships, { name: ['name'], tag: [] }, true)).toEqual([
          shipWithName,
          shipWithNameAndTag,
          hiddenShipWithNameAndTag,
        ]);
      });
    });

    describe('検索対象が名前とタグ両方を含む場合', () => {
      it('両方で検索した結果が返る', () => {
        expect(
          filterShips(ships, { name: ['name'], tag: ['label'] }, true)
        ).toEqual([shipWithNameAndTag, hiddenShipWithNameAndTag]);
      });
    });

    describe('検索対象が設定されていない場合', () => {
      it('全キャラが返る', () => {
        expect(filterShips(ships, { name: [], tag: [] }, true)).toEqual(ships);
      });
    });

    describe('検索にヒットしない場合', () => {
      it('空配列が返る', () => {
        expect(
          filterShips(
            ships,
            { name: ['not-included-name'], tag: ['not-included-tag'] },
            true
          )
        ).toEqual([]);
      });
    });
  });
});
