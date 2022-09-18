import { CharactersData } from './characters-data';
import { useCharactersData } from './fetch-data';
import { loadCharactersDataFromJson } from './load-data';

jest.mock('./load-data');
describe('fetch-characters-data', () => {
  describe('データフェッチに成功する場合', () => {
    let result: CharactersData;
    const charactersData: CharactersData = {
      characters: [],
      metadata: {
        character: '',
      },
    };

    beforeEach(async () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue({}),
      });
      (loadCharactersDataFromJson as unknown as jest.Mock).mockReturnValue(
        charactersData
      );
      result = await useCharactersData('test');
    });

    it('fetchが指定のURLで呼ばれている', () => {
      expect(fetch).toBeCalledWith('/api/characters-data/test');
    });

    it('読み込んだキャラクターデータを返す', () => {
      expect(result).toEqual(charactersData);
    });
  });

  describe('データフェッチに失敗する場合', () => {
    describe('フェッチ結果が4xxの場合', () => {
      beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
          status: 404,
        });
      });

      it('エラーを投げる', () => {
        expect(() => useCharactersData('test')).rejects.toThrowError(
          'Not Found'
        );
      });
    });

    describe('フェッチ結果が5xxの場合', () => {
      beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
          status: 500,
        });
      });

      it('エラーを投げる', () => {
        expect(() => useCharactersData('test')).rejects.toThrowError(
          'Internal Server Error'
        );
      });
    });
  });
});
