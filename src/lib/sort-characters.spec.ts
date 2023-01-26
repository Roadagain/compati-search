import { compareKana, sortById, sortByKana } from './sort-characters';
import { TaggedCharacter } from './tagged-character';

describe('compareKana', () => {
  describe('両方とも1文字目がアルファベットの場合', () => {
    it('読みがなの比較結果を返す', () => {
      expect(compareKana('alpha', 'bet')).toBe(-1);
      expect(compareKana('bet', 'alpha')).toBe(1);
    });
  });
  describe('両方とも1文字目がひらがなの場合', () => {
    it('読みがなの比較結果を返す', () => {
      expect(compareKana('あいうえお', 'かきくけこ')).toBe(-1);
      expect(compareKana('かきくけこ', 'あいうえお')).toBe(1);
    });
  });

  describe('片方の1文字目がアルファベットで片方の1文字目がひらがなの場合', () => {
    it('ひらがなが優先される', () => {
      expect(compareKana('あいうえお', 'bet')).toBe(-1);
      expect(compareKana('alpha', 'かきくけこ')).toBe(1);
    });
  });
});

describe('sortByKana', () => {
  it('五十音昇順→アルファベット昇順でソートされる', () => {
    const kanas = ['かきくけこ', 'さしすせそ', 'fghij', 'abcde', 'あいうえお'];
    const characters = kanas.map((kana) => ({ kana } as TaggedCharacter));

    expect(sortByKana(characters)).toEqual([
      { kana: 'あいうえお' },
      { kana: 'かきくけこ' },
      { kana: 'さしすせそ' },
      { kana: 'abcde' },
      { kana: 'fghij' },
    ]);
  });
});

describe('sortById', () => {
  it('ID昇順でソートされる', () => {
    const ids = [333, 22, 4444, 1];
    const characters = ids.map((id) => ({ id } as TaggedCharacter));
    expect(sortById(characters)).toEqual([
      { id: 1 },
      { id: 22 },
      { id: 333 },
      { id: 4444 },
    ]);
  });
});
