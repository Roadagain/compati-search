import { Ship } from '../ship';
import { sortByKana } from './kana';

describe('sortByKana', () => {
  it('五十音昇順→アルファベット昇順→その他の文字でソートされる', () => {
    const kanas = [
      'かきくけこ',
      'さしすせそ',
      'Верный',
      'fghij',
      'abcde',
      'あいうえお',
    ];
    const ships = kanas.map((kana) => ({ kana } as Ship));

    expect(sortByKana(ships)).toEqual([
      { kana: 'あいうえお' },
      { kana: 'かきくけこ' },
      { kana: 'さしすせそ' },
      { kana: 'abcde' },
      { kana: 'fghij' },
      { kana: 'Верный' },
    ]);
  });
});
