import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { CharactersData } from './characters-data';
import { loadCharactersDataFromJson } from './load-data';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const useCharactersData = (dataName: string): CharactersData | null => {
  const { data, error } = useSWRImmutable(
    `/api/characters-data/${dataName}`,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );
  const [charactersData, setCharactersData] = useState<CharactersData | null>(
    null
  );
  if (data && !charactersData) {
    setCharactersData(loadCharactersDataFromJson(data));
  }
  if (error) {
    console.log('Not Found');
  }
  return charactersData;
};
