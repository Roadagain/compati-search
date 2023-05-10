import { generateAutocompleteOptions } from '../lib/autocomplete';
import { filterShips } from '../lib/filter-ships';
import { Ship } from '../lib/ship';
import { SortOrder, sortShips } from '../lib/sort-ships';
import { Tag } from '../lib/tag';
import { TagCategory } from '../lib/tag-category';
import {
  onChangeSearchWords,
  onChangeShowAll,
  onChangeSortOrder,
  onClickTag,
  onLoadData,
  onShowNextPage,
} from './dispatch';
import { State } from './state';

jest.mock('../lib/filter-ships');
jest.mock('../lib/sort-ships');
jest.mock('../lib/autocomplete');

const baseState: Readonly<State> = {
  isReady: false,
  ships: [],
  tags: [],
  search: {
    info: {
      autocompleteOptions: {
        categories: [],
        types: [],
        equipments: [],
        abilities: [],
        speeds: [],
        ranges: [],
        names: [],
      },
    },
    words: {
      categories: [],
      types: [],
      equipments: [],
      abilities: [],
      speeds: [],
      ranges: [],
      names: [],
    },
    showAll: false,
    sortOrder: SortOrder.ID,
    results: [],
    page: 1,
  },
};

describe('onLoadShips', () => {
  const currentState: State = {
    ...baseState,
    isReady: false,
    ships: [],
  };
  let nextState: State;
  const ships: Ship[] = [{} as Ship];
  const tags: Tag[] = [{} as Tag];

  beforeEach(() => {
    nextState = onLoadData(currentState, ships, tags);
  });

  it('準備完了フラグが変更されている', () => {
    expect(nextState.isReady).toBeTruthy();
  });

  it('艦船が変更されている', () => {
    expect(nextState.ships).toEqual(ships);
  });

  it('タグ一覧が変更されている', () => {
    expect(nextState.tags).toEqual(tags);
  });

  it('補完候補生成関数が呼び出されている', () => {
    expect(generateAutocompleteOptions).toBeCalled();
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
        categories: ['test'],
        types: [],
        equipments: [],
        abilities: [],
        speeds: [],
        ranges: [],
        names: ['sample'],
      },
      page: 4,
    },
  };
  let nextState: State;

  const words = ['word', 'sample'];
  beforeEach(() => {
    nextState = onChangeSearchWords(currentState, 'names', words);
  });

  it('指定された検索対象の検索ワードが変更されている', () => {
    expect(nextState.search.words.names).toEqual(words);
  });

  it('ページがリセットされている', () => {
    expect(nextState.search.page).toBe(1);
  });

  it('フィルタ関数が呼び出されている', () => {
    expect(filterShips).toBeCalled();
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

      it('補完候補生成関数が呼び出されている', () => {
        expect(generateAutocompleteOptions).toBeCalled();
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

  it('艦船をソートする関数が呼ばれている', () => {
    expect(sortShips).nthCalledWith(1, currentState.ships, SortOrder.KANA);
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
  const category: TagCategory = 'types';
  const tag = 'tag';

  const currentState: State = {
    ...baseState,
    search: {
      ...baseState.search,
      words: {
        ...baseState.search.words,
        categories: ['abc'],
        types: [],
      },
      page: 2,
    },
  };

  beforeEach(() => {
    nextState = onClickTag(currentState, category, tag);
  });

  it('既存の検索ワードにクリックしたタグが追加されている', () => {
    expect(nextState.search.words[category]).toEqual([tag]);
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
