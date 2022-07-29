import { loadSampleCharactersData } from './load-data';
import charactersData from '../sample/characters-data.json';

describe('loadSampleCharactersData', () => {
  it('サンプルデータが返る', () => {
    expect(loadSampleCharactersData()).toStrictEqual(
      charactersData.map(({ name, tags }) => ({
        name,
        tags: new Set(tags),
      }))
    );
  });
});
