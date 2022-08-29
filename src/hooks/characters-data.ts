import { useEffect, useState } from 'react';
import {
  loadCharactersDataFromJson,
  loadSampleCharactersData,
} from '../lib/load-data';
import { TaggedCharacter } from '../lib/tagged-character';

type CharactersDataLoadingState = [[], false];
type CharactersDataLoadedState = [TaggedCharacter[], true];
type CharactersDataState =
  | CharactersDataLoadingState
  | CharactersDataLoadedState;

export const useCharactersData = (dataName: string): CharactersDataState => {
  const [charactersDataState, setCharactersDataState] =
    useState<CharactersDataState>([[], false]);
  useEffect(() => {
    new Promise<TaggedCharacter[]>((resolve) => {
      if (dataName === 'sample') {
        return resolve(loadSampleCharactersData());
      }
      fetch(`/api/characters-data/${dataName}`)
        .then((res) => res.json())
        .then(loadCharactersDataFromJson)
        .then(resolve);
    }).then((charactersData) => setCharactersDataState([charactersData, true]));
  }, [dataName]);

  return charactersDataState;
};
