import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { Action } from './action';
import { reducer } from './reducer';
import { initialState, State } from './state';

interface ContextType {
  state: State;
  dispatch: Dispatch<Action>;
}
export const FluxContext = createContext<ContextType>({
  // Providerで上書きするからnullでもいいんだけど、一応validな値を入れておく
  state: initialState,
  dispatch: () => initialState,
});

interface Props {
  children: ReactNode;
}

export const FluxProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <FluxContext.Provider value={value}>{children}</FluxContext.Provider>;
};
