import { TaggedCharacter } from '../tagged-character';
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
    const characters = kanas.map((kana) => ({ kana } as TaggedCharacter));

    expect(sortByKana(characters)).toEqual([
      { kana: 'あいうえお' },
      { kana: 'かきくけこ' },
      { kana: 'さしすせそ' },
      { kana: 'abcde' },
      { kana: 'fghij' },
      { kana: 'Верный' },
    ]);
  });
});
