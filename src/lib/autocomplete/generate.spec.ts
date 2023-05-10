import { Ship } from '../ship';
import { generateNameAutocompleteOptions } from './generate';

describe('generateAutocompleteOptions', () => {
  const ships: Ship[] = [
    {
      name: 'Alpha',
      showDefault: true,
    } as Ship,
    {
      name: 'Beta',
      showDefault: true,
    } as Ship,
    {
      name: 'Gamma',
      showDefault: false,
    } as Ship,
    {
      name: 'Delta',
      showDefault: false,
    } as Ship,
  ];

  describe('デフォルト表示キャラのみが対象の場合', () => {
    it('デフォルト表示キャラの名前とタグの一覧を重複なく返す', () => {
      expect(generateNameAutocompleteOptions(ships, false)).toEqual([
        'Alpha',
        'Beta',
      ]);
    });
  });

  describe('全キャラのみが対象の場合', () => {
    it('全キャラの名前とタグの一覧を重複なく返す', () => {
      expect(generateNameAutocompleteOptions(ships, true)).toEqual([
        'Alpha',
        'Beta',
        'Gamma',
        'Delta',
      ]);
    });
  });
});
