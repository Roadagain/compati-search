import { useEffect, useState } from 'react';
import { CharactersData } from '../lib/characters-data';
import { loadCharactersDataFromJson } from '../lib/load-data';

// [characters, isLoading]
type CharactersDataLoadingState = [null, true];
type CharactersDataLoadedState = [CharactersData, false];
type CharactersDataState =
  | CharactersDataLoadingState
  | CharactersDataLoadedState;

export const useCharactersData = (dataName: string): CharactersDataState => {
  const [charactersDataState, setCharactersDataState] =
    useState<CharactersDataState>([null, true]);
  useEffect(() => {
    fetch(`/api/characters-data/${dataName}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Not Found');
        }
        return res.json();
      })
      .then(loadCharactersDataFromJson)
      .then((charactersData) => setCharactersDataState([charactersData, false]))
      .catch(console.error);
  }, [dataName]);

  return charactersDataState;
};
