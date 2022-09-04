import { CharactersData } from './characters-data';
import { loadCharactersDataFromJson } from './load-data';

export const fetchCharactersData = async (
  dataName: string
): Promise<CharactersData> => {
  const res = await fetch(`/api/characters-data/${dataName}`);
  if (400 <= res.status && res.status < 500) {
    throw new Error('Not Found');
  }
  if (500 <= res.status && res.status < 600) {
    throw new Error('Internal Server Error');
  }
  const json = await res.json();
  return loadCharactersDataFromJson(json);
};
