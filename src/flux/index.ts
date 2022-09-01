import { useReducer } from 'react';
import { reducer } from './reducer';
import { initialState } from './state';

export const useFlux = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    dispatch,
  };
};
