import { Ship } from '../ship';
import { generateAutocompleteOptions } from './generate';

describe('generateAutocompleteOptions', () => {
  const ships: Ship[] = [
    {
      name: 'Alpha',
      category: 'category-one',
      type: 'type-one',
      speed: 'slow',
      range: 'long',
      equipments: ['abc', 'def'],
      abilities: ['あいうえお'],
      showDefault: true,
    } as Ship,
    {
      name: 'Beta',
      category: 'category-two',
      type: 'type-two',
      speed: 'fast',
      range: 'middle',
      equipments: ['def'],
      abilities: ['かきくけこ'],
      showDefault: true,
    } as Ship,
    {
      name: 'Gamma',
      category: 'category-one',
      type: 'type-one',
      speed: 'super-fast',
      range: 'short',
      equipments: ['def', 'ghi'],
      abilities: ['かきくけこ'],
      showDefault: false,
    } as Ship,
    {
      name: 'Delta',
      category: 'category-three',
      type: 'type-three',
      speed: 'fast',
      range: 'short',
      equipments: [],
      abilities: ['さしすせそ'],
      showDefault: false,
    } as Ship,
  ];

  describe('デフォルト表示キャラのみが対象の場合', () => {
    it('デフォルト表示キャラの名前とタグの一覧を重複なく返す', () => {
      expect(generateAutocompleteOptions(ships, false)).toEqual({
        names: ['Alpha', 'Beta'],
        categories: ['category-one', 'category-two'],
        types: ['type-one', 'type-two'],
        speeds: ['fast', 'slow'],
        ranges: ['long', 'middle'],
        equipments: ['abc', 'def'],
        abilities: ['あいうえお', 'かきくけこ'],
      });
    });
  });

  describe('全キャラのみが対象の場合', () => {
    it('全キャラの名前とタグの一覧を重複なく返す', () => {
      expect(generateAutocompleteOptions(ships, true)).toEqual({
        names: ['Alpha', 'Beta', 'Gamma', 'Delta'],
        categories: ['category-one', 'category-three', 'category-two'],
        types: ['type-one', 'type-three', 'type-two'],
        speeds: ['fast', 'slow', 'super-fast'],
        ranges: ['long', 'middle', 'short'],
        equipments: ['abc', 'def', 'ghi'],
        abilities: ['あいうえお', 'かきくけこ', 'さしすせそ'],
      });
    });
  });
});
