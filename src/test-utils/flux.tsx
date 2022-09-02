import { initialState, State } from "../flux/state";
import { characters } from '../../sample/characters-data/sample.json'
import React, { useReducer } from "react";
import { reducer } from "../flux/reducer";
import { FluxContext } from "../flux/context";

export const initialTestState: State = {
  ...initialState,
  search: {
    ...initialState.search,
    results:characters,
  },
  characters,
}

interface Props {
  children: React.ReactNode;
}

export const TestFluxProvider: React.FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialTestState);
  return (
    <FluxContext.Provider value={{state, dispatch}}>
      {children}
    </FluxContext.Provider>
  )
}
