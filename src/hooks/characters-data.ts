import { useEffect, useState } from 'react';
import { loadCharactersFromJson } from '../lib/load-data';
import { TaggedCharacter } from '../lib/tagged-character';

// [characters, isLoading]
type CharactersDataLoadingState = [[], true];
type CharactersDataLoadedState = [TaggedCharacter[], false];
type CharactersDataState =
  | CharactersDataLoadingState
  | CharactersDataLoadedState;

export const useCharactersData = (dataName: string): CharactersDataState => {
  const [charactersDataState, setCharactersDataState] =
    useState<CharactersDataState>([[], true]);
  useEffect(() => {
    fetch(`/api/characters-data/${dataName}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Not Found');
        }
        return res.json();
      })
      .then(loadCharactersFromJson)
      .then((charactersData) => setCharactersDataState([charactersData, false]))
      .catch(console.error);
  }, [dataName]);

  return charactersDataState;
};
