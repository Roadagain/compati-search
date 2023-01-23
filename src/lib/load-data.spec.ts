import {
  loadCharactersDataFromJson,
  loadCharactersFromJson,
} from './load-data';

describe('loadCharactersFromJson', () => {
  describe('データ形式が正しい場合', () => {
    const json = [
      {
        name: 'Alpha',
        tags: [
          { category: 'number', label: 'one' },
          { category: 'count', label: 'two' },
        ],
        showDefault: true,
      },
      {
        name: 'Beta',
        tags: [],
        showDefault: false,
      },
    ];

    it('読み込んだキャラクターデータが返る', () => {
      expect(loadCharactersFromJson(json)).toEqual(json);
    });
  });

  describe('データ形式が不正な場合', () => {
    const json = [
      {
        name: 1,
        tags: [
          { category: 'number', label: 'one' },
          { category: 'count', label: 'two' },
        ],
        showDefault: true,
      },
      {
        name: 'Beta',
        tags: [{ category: 'number', label: 'three' }],
        showDefault: true,
      },
    ];

    it('エラーが返る', () => {
      expect(() => loadCharactersFromJson(json)).toThrowError(
        'Invalid characters'
      );
    });
  });
});

describe('loadCharactersData', () => {
  describe('データ形式がCharactersDataに沿う場合', () => {
    const json = {
      characters: [
        {
          name: '名前',
          tags: [
            {
              category: 'カテゴリー',
              label: 'ラベル',
            },
          ],
          showDefault: true,
        },
      ],
    };

    it('読み込んだCharactersDataが返る', () => {
      expect(loadCharactersDataFromJson(json)).toEqual({
        characters: [
          {
            name: '名前',
            tags: [
              {
                category: 'カテゴリー',
                label: 'ラベル',
              },
            ],
            showDefault: true,
          },
        ],
      });
    });
  });

  describe('データ形式が不正な場合', () => {
    const json = {
      characters: 8,
    };

    it('エラーが返る', () => {
      expect(() => loadCharactersDataFromJson(json)).toThrowError(
        'Invalid characters data'
      );
    });
  });
});
