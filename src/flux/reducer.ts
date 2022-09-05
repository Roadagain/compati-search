import { Reducer } from 'react';
import { Action } from './action';
import {
  onChangeSearchTarget,
  onChangeSearchWords,
  onChangeShowAll,
  onClickTag,
  onLoadCharactersData,
} from './dispatch';
import { State } from './state';

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'load-characters-data':
      return onLoadCharactersData(state, action.charactersData);
    case 'change-search-target':
      return onChangeSearchTarget(state, action.target);
    case 'change-search-words':
      return onChangeSearchWords(state, action.words);
    case 'change-show-all':
      return onChangeShowAll(state, action.showAll);
    case 'click-tag':
      return onClickTag(state, action.label);
    default:
      throw new Error('Invalid dispatch action');
  }
};
