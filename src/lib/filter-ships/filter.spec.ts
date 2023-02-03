import { Ship } from '../ship';
import { filterShips } from '.';

describe('filterShips', () => {
  const shipWithTag = {
    name: '',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  } as Ship;
  const shipWithName = {
    name: 'name',
    tags: [],
    showDefault: true,
  } as Ship;
  const shipWithNameAndTag = {
    name: 'name2',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  } as Ship;
  const hiddenShipWithName = {
    name: 'name_hidden',
    tags: [],
    showDefault: false,
  } as Ship;
  const hiddenShipWithTag = {
    name: '',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: false,
  } as Ship;
  const hiddenShipWithNameAndTag = {
    name: 'name_hidden2',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: false,
  } as Ship;
  const ships = [
    shipWithTag,
    shipWithName,
    shipWithNameAndTag,
    hiddenShipWithTag,
    hiddenShipWithName,
    hiddenShipWithNameAndTag,
  ];

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索対象がタグの場合', () => {
      it('タグ検索の結果が返る', () => {
        expect(filterShips(ships, { name: [], tag: ['label'] }, false)).toEqual(
          [shipWithTag, shipWithNameAndTag]
        );
      });

      it('マイナスタグを含まない結果が返る', () => {
        expect(
          filterShips(ships, { name: [], tag: ['-label'] }, false)
        ).toEqual([shipWithName]);
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(filterShips(ships, { name: ['name'], tag: [] }, false)).toEqual([
          shipWithName,
          shipWithNameAndTag,
        ]);
      });

      it('マイナスワードを含まない結果が返る', () => {
        expect(filterShips(ships, { name: ['-name'], tag: [] }, false)).toEqual(
          [shipWithTag]
        );
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
        expect(filterShips(ships, { name: [], tag: [] }, false)).toEqual([
          shipWithTag,
          shipWithName,
          shipWithNameAndTag,
        ]);
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
          hiddenShipWithTag,
          hiddenShipWithNameAndTag,
        ]);
      });

      it('マイナスタグを含まない結果が返る', () => {
        expect(filterShips(ships, { name: [], tag: ['-label'] }, true)).toEqual(
          [shipWithName, hiddenShipWithName]
        );
      });
    });

    describe('検索対象が名前の場合', () => {
      it('名前検索の結果が返る', () => {
        expect(filterShips(ships, { name: ['name'], tag: [] }, true)).toEqual([
          shipWithName,
          shipWithNameAndTag,
          hiddenShipWithName,
          hiddenShipWithNameAndTag,
        ]);
      });

      it('マイナスワードを含まない結果が返る', () => {
        expect(filterShips(ships, { name: ['-name'], tag: [] }, true)).toEqual([
          shipWithTag,
          hiddenShipWithTag,
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
