import { filterShips } from '../lib/filter-ships';
import { SearchType } from '../lib/search-target';
import { Ship } from '../lib/ship';
import { ShipsData } from '../lib/ships-data';
import { sortShips, SortOrder } from '../lib/sort-ships';
import {
  onChangeSearchWords,
  onChangeShowAll,
  onChangeSortOrder,
  onClickTag,
  onLoadCharactersData,
  onShowNextPage,
} from './dispatch';
import { State } from './state';

jest.mock('../lib/filter-ships');
jest.mock('../lib/sort-characters');

const baseState: Readonly<State> = {
  isReady: false,
  characters: [],
  search: {
    info: {
      autocompleteOptions: {},
      targets: [],
    },
    words: {},
    showAll: false,
    sortOrder: SortOrder.ID,
    results: [],
    page: 1,
  },
};

describe('onLoadCharacters', () => {
  const currentState: State = {
    ...baseState,
    isReady: false,
    characters: [],
  };
  let nextState: State;
  const characterShowDefault: Ship = {
    id: 1,
    name: 'name',
    kana: 'name',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  };
  const characterHiddenDefault: Ship = {
    id: 2,
    name: 'name-hidden',
    kana: 'name-hidden',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
      {
        category: 'category2',
        label: 'hidden',
      },
    ],
    showDefault: false,
  };
  const characters: Ship[] = [characterShowDefault, characterHiddenDefault];
  const charactersData: ShipsData = {
    ships: characters,
  };

  beforeEach(() => {
    nextState = onLoadCharactersData(currentState, charactersData);
  });

  it('準備完了フラグが変更されている', () => {
    expect(nextState.isReady).toBeTruthy();
  });

  it('キャラクターが変更されている', () => {
    expect(nextState.characters).toEqual(characters);
  });

  it('フィルタ関数が呼び出されている', () => {
    expect(filterShips).toBeCalled();
  });
});

describe('onChangeSearchWords', () => {
  const currentState: State = {
    ...baseState,
    search: {
      ...baseState.search,
      words: {
        name: ['sample'],
        test: ['test'],
      },
      page: 4,
    },
  };
  let nextState: State;

  describe('名前が対象のとき', () => {
    const words = ['word', 'sample'];
    beforeEach(() => {
      nextState = onChangeSearchWords(
        currentState,
        { type: SearchType.NAME },
        words
      );
    });

    it('名前の検索ワードが変更されている', () => {
      expect(nextState.search.words.name).toEqual(words);
    });

    it('ページがリセットされている', () => {
      expect(nextState.search.page).toBe(1);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterShips).toBeCalled();
    });
  });

  describe('タグカテゴリが対象のとき', () => {
    const words = ['word', 'sample'];
    beforeEach(() => {
      nextState = onChangeSearchWords(
        currentState,
        { type: SearchType.TAG, category: 'test' },
        words
      );
    });

    it('指定したタグカテゴリの検索ワードが変更されている', () => {
      expect(nextState.search.words.test).toEqual(words);
    });

    it('ページがリセットされている', () => {
      expect(nextState.search.page).toBe(1);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterShips).toBeCalled();
    });
  });
});

describe('onChangeShowAll', () => {
  let nextState: State;

  describe.each`
    currentShowAll | newShowAll
    ${true}        | ${true}
    ${true}        | ${false}
    ${false}       | ${true}
    ${false}       | ${false}
  `(
    '現在の全キャラ表示フラグが $currentShowAll で変更後のフラグが $newShowAll の場合',
    ({ currentShowAll, newShowAll }) => {
      const currentState: State = {
        ...baseState,
        search: {
          ...baseState.search,
          showAll: currentShowAll,
          page: 3,
        },
      };

      beforeEach(() => {
        nextState = onChangeShowAll(currentState, newShowAll);
      });

      it('全キャラ表示フラグが変更後の値になっている', () => {
        expect(nextState.search.showAll).toBe(newShowAll);
      });

      it('ページがリセットされている', () => {
        expect(nextState.search.page).toBe(1);
      });

      it('フィルタ関数が呼び出されている', () => {
        expect(filterShips).toBeCalled();
      });
    }
  );
});

describe('onChangeSortOrder', () => {
  let nextState: State;

  const currentState: State = {
    ...baseState,
    search: {
      ...baseState.search,
      sortOrder: SortOrder.ID,
    },
  };

  beforeEach(() => {
    nextState = onChangeSortOrder(currentState, SortOrder.KANA);
  });

  it('stateのソート順が変わっている', () => {
    expect(nextState.search.sortOrder).toBe(SortOrder.KANA);
  });

  it('キャラクターをソートする関数が呼ばれている', () => {
    expect(sortShips).nthCalledWith(1, currentState.characters, SortOrder.KANA);
  });

  it('検索結果をソートする関数が呼ばれている', () => {
    expect(sortShips).nthCalledWith(
      2,
      currentState.search.results,
      SortOrder.KANA
    );
  });
});

describe('onClickTag', () => {
  let nextState: State;
  const label = 'label';

  const currentState: State = {
    ...baseState,
    search: {
      ...baseState.search,
      info: {
        ...baseState.search.info,
        autocompleteOptions: {
          test: [label],
        },
      },
      words: {
        name: ['sample'],
        test: [],
      },
      page: 2,
    },
  };

  beforeEach(() => {
    nextState = onClickTag(currentState, label);
  });

  it('既存の検索ワードにクリックしたタグが追加されている', () => {
    expect(nextState.search.words).toEqual({
      ...currentState.search.words,
      test: [label],
    });
  });

  it('ページがリセットされている', () => {
    expect(nextState.search.page).toBe(1);
  });

  it('フィルタ関数が呼び出されている', () => {
    expect(filterShips).toBeCalled();
  });
});

describe('onShowNextPage', () => {
  let nextState: State;
  const currentState = {
    ...baseState,
    search: {
      ...baseState.search,
      page: 1,
    },
  };

  beforeEach(() => {
    nextState = onShowNextPage(currentState);
  });

  it('pageが1つ増えている', () => {
    expect(nextState.search.page).toBe(2);
  });
});
