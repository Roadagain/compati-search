import { Action } from './action';
import {
  onChangeSearchWords,
  onChangeShowAll,
  onChangeSortOrder,
  onClickTag,
  onLoadData,
  onShowNextPage,
} from './dispatch';
import { reducer } from './reducer';
import { initialState } from './state';

jest.mock('./dispatch');

describe('reducer', () => {
  const state = initialState;

  describe.each`
    type                     | method
    ${'load-data'}           | ${onLoadData}
    ${'change-search-words'} | ${onChangeSearchWords}
    ${'change-show-all'}     | ${onChangeShowAll}
    ${'change-sort-order'}   | ${onChangeSortOrder}
    ${'click-tag'}           | ${onClickTag}
    ${'show-next-page'}      | ${onShowNextPage}
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
