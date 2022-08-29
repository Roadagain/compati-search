import { useEffect, useState } from 'react';
import { loadCharactersDataFromJson } from '../lib/load-data';
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
    new Promise<TaggedCharacter[]>((resolve) => {
      fetch(`/api/characters-data/${dataName}`)
        .then((res) => res.json())
        .then(loadCharactersDataFromJson)
        .then(resolve);
    }).then((charactersData) =>
      setCharactersDataState([charactersData, false])
    );
  }, [dataName]);

  return charactersDataState;
};
