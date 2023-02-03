const wordWithoutFirstMinus = (word: string): string => {
  return word.match(/-?(.*)/)[1];
};

export const isOptionEqualToWord = (option: string, word: string): boolean => {
  // マイナス検索しているラベルやマイナス検索中のプラスラベルを除外する
  const pureWord = wordWithoutFirstMinus(word);
  const pureLabel = wordWithoutFirstMinus(option);
  return pureWord === pureLabel;
};
