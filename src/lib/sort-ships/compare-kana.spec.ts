import { compareKana } from './kana';

describe('compareKana', () => {
  describe('両方とも1文字目がひらがな以外の場合', () => {
    it('読みがなの比較結果を返す', () => {
      expect(compareKana('alpha', 'bet')).toBe(-1);
      expect(compareKana('д', 'alpha')).toBe(1);
    });
  });

  describe('両方とも1文字目がひらがなの場合', () => {
    it('読みがなの比較結果を返す', () => {
      expect(compareKana('あいうえお', 'かきくけこ')).toBe(-1);
      expect(compareKana('かきくけこ', 'あいうえお')).toBe(1);
    });
  });

  describe('片方の1文字目がひらがな以外で片方の1文字目がひらがなの場合', () => {
    it('ひらがなが優先される', () => {
      expect(compareKana('あいうえお', 'bet')).toBe(-1);
      expect(compareKana('д', 'かきくけこ')).toBe(1);
    });
  });
});
