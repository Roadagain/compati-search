import { CharactersData } from '../lib/characters-data';
import { Metadata } from '../lib/metadata';
import { SearchTarget } from '../lib/search-target';
import { filterCharacters, TaggedCharacter } from '../lib/tagged-character';
import {
  onChangeSearchTarget,
  onChangeSearchWords,
  onChangeShowAll,
  onClickTag,
  onLoadCharactersData,
} from './dispatch';
import { State } from './state';

jest.mock('../lib/tagged-character');

describe('各dispatchの対応', () => {
  const state: Readonly<State> = {
    isReady: false,
    characters: [],
    metadata: {
      character: '',
    },
    search: {
      target: SearchTarget.TAG,
      words: [],
      showAll: false,
      results: [],
    },
  };

  beforeEach(() => {
    (filterCharacters as unknown as jest.Mock).mockReturnValue([]);
  });

  describe('onLoadCharacters', () => {
    let nextState: State;
    const characterShowDefault: TaggedCharacter = {
      name: 'name',
      tags: [
        {
          category: 'category',
          label: 'label',
        },
      ],
      showDefault: true,
    };
    const characterHiddenDefault: TaggedCharacter = {
      name: 'name-hidden',
      tags: [
        {
          category: 'category',
          label: 'label',
        },
      ],
      showDefault: false,
    };
    const characters: TaggedCharacter[] = [
      characterShowDefault,
      characterHiddenDefault,
    ];
    const metadata: Metadata = {
      character: 'きゃらくた',
    };
    const charactersData: CharactersData = {
      characters,
      metadata,
    };

    beforeEach(() => {
      nextState = onLoadCharactersData(state, charactersData);
    });

    it('準備完了フラグが変更されている', () => {
      expect(nextState.isReady).toBeTruthy();
    });

    it('キャラクターが変更されている', () => {
      expect(nextState.characters).toEqual(characters);
    });

    it('メタデータが変更されている', () => {
      expect(nextState.metadata).toEqual(metadata);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterCharacters).toBeCalled();
    });
  });

  describe('onChangeSearchTarget', () => {
    let nextState: State;
    const target = SearchTarget.NAME;

    beforeEach(() => {
      nextState = onChangeSearchTarget(state, target);
    });

    it('検索対象が変更されている', () => {
      expect(nextState.search.target).toBe(target);
    });

    it('検索ワードがリセットされている', () => {
      expect(nextState.search.words).toEqual([]);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterCharacters).toBeCalled();
    });
  });

  describe('onChangeSearchWords', () => {
    let nextState: State;
    const words = ['word'];

    beforeEach(() => {
      nextState = onChangeSearchWords(state, words);
    });

    it('検索ワードが変更されている', () => {
      expect(nextState.search.words).toEqual(words);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterCharacters).toBeCalled();
    });
  });

  describe('onChangeShowAll', () => {
    let nextState: State;
    const showAll = true;

    beforeEach(() => {
      nextState = onChangeShowAll(state, showAll);
    });

    it('全キャラ表示フラグが変更されている', () => {
      expect(nextState.search.showAll).toBe(showAll);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterCharacters).toBeCalled();
    });
  });

  describe('onClickTag', () => {
    let nextState: State;
    const label = 'label';

    describe('今のstateがタグ検索のとき', () => {
      const currentState: State = {
        ...state,
        search: {
          ...state.search,
          target: SearchTarget.TAG,
          words: ['imano', 'tag'],
        },
      };

      beforeEach(() => {
        nextState = onClickTag(currentState, label);
      });

      it('検索対象がタグになっている', () => {
        expect(nextState.search.target).toBe(SearchTarget.TAG);
      });

      it('既存の検索ワードにクリックしたタグが追加されている', () => {
        expect(nextState.search.words).toEqual([
          ...currentState.search.words,
          label,
        ]);
      });

      it('フィルタ関数が呼び出されている', () => {
        expect(filterCharacters).toBeCalled();
      });
    });

    describe('今のstateが名前検索のとき', () => {
      const currentState: State = {
        ...state,
        search: {
          ...state.search,
          target: SearchTarget.NAME,
          words: ['imano', 'name'],
        },
      };

      beforeEach(() => {
        nextState = onClickTag(currentState, label);
      });

      it('検索対象がタグになっている', () => {
        expect(nextState.search.target).toBe(SearchTarget.TAG);
      });

      it('検索ワードがクリックしたタグのみになっている', () => {
        expect(nextState.search.words).toEqual([label]);
      });

      it('フィルタ関数が呼び出されている', () => {
        expect(filterCharacters).toBeCalled();
      });
    });
  });
});
