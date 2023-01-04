import { Action } from './action';
import {
  onChangeSearchWords,
  onChangeShowAll,
  onClickTag,
  onLoadCharactersData,
  onShowNextPage,
} from './dispatch';
import { reducer } from './reducer';
import { initialState } from './state';

jest.mock('./dispatch');

describe('reducer', () => {
  const state = initialState;

  describe.each`
    type                      | method
    ${'load-characters-data'} | ${onLoadCharactersData}
    ${'change-search-words'}  | ${onChangeSearchWords}
    ${'change-show-all'}      | ${onChangeShowAll}
    ${'click-tag'}            | ${onClickTag}
    ${'show-next-page'}       | ${onShowNextPage}
  `('action.typeが$typeのとき', ({ type, method }) => {
    beforeEach(() => {
      reducer(state, { type } as unknown as Action);
    });
    it(`${method.name}が呼ばれる`, () => {
      expect(method).toBeCalled();
    });
  });
  describe('actionがどれにも当てはまらないとき', () => {
    const action = {
      type: 'unknown',
    } as unknown as Action;

    it('エラーが返る', () => {
      expect(() => reducer(state, action)).toThrowError(
        'Invalid dispatch action'
      );
    });
  });
});
