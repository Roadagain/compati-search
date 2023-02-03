import { isOptionEqualToWord } from './compare';

describe('isOptionEqualToWord', () => {
  describe('最初のマイナス(-)を除いてラベルとワードが一致する場合', () => {
    describe.each`
      option     | word
      ${'test'}  | ${'test'}
      ${'test'}  | ${'-test'}
      ${'-test'} | ${'test'}
      ${'-test'} | ${'-test'}
    `('タグラベルが $label でワードが $word の場合', ({ option, word }) => {
      it('同じと判定される', () => {
        expect(isOptionEqualToWord(option, word)).toBeTruthy();
      });
    });
  });

  describe('最初のマイナス(-)を除いてもラベルとワードが一致しない場合', () => {
    describe.each`
      option      | word
      ${'label'}  | ${'word'}
      ${'label'}  | ${'-word'}
      ${'-label'} | ${'word'}
      ${'-label'} | ${'-word'}
    `('タグラベルが $label でワードが $word の場合', ({ option, word }) => {
      it('違うと判定される', () => {
        expect(isOptionEqualToWord(option, word)).toBeFalsy();
      });
    });
  });
});
