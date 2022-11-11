import { SearchTarget, SearchType } from './search-target';
import { TaggedCharacter } from './tagged-character';

export const uniqueAndSortTagLabels = (tagLabels: string[]): string[] => {
  return Array.from(new Set(tagLabels)).sort();
};

export const generateAutocompleteOptions = (
  characters: TaggedCharacter[],
  target: SearchTarget,
  showAll: boolean
): string[] => {
  const charactersShown = characters.filter(
    ({ showDefault }) => showAll || showDefault
  );
  switch (target.type) {
    case SearchType.TAG:
      if ('category' in target) {
        return uniqueAndSortTagLabels(
          charactersShown
            .flatMap(({ tags }) => tags)
            .filter(({ category }) => category === target.category)
            .map(({ label }) => label)
        );
      }
      return uniqueAndSortTagLabels(
        charactersShown.flatMap(({ tags }) => tags).map(({ label }) => label)
      );
    case SearchType.NAME:
      return charactersShown.map(({ name }) => name);
  }
};

export const wordWithoutFirstMinus = (word: string): string => {
  return word.match(/-?(.*)/)[1];
};

export const isOptionEqualToWord = (
  // 補完対象から選択した場合AutocompleteOption、最後まで自分で入力した場合はstringになる
  option: string,
  word: string
): boolean => {
  // マイナス検索しているラベルやマイナス検索中のプラスラベルを除外する
  const pureWord = wordWithoutFirstMinus(word);
  const pureLabel = wordWithoutFirstMinus(option);
  return pureWord === pureLabel;
};

export const filterOptionsByWord = (
  options: string[],
  word: string
): string[] => {
  // マイナス検索しているラベルやマイナス検索中のプラスラベルを除外する
  const pureWord = wordWithoutFirstMinus(word);
  return options.filter((option) => {
    const pureLabel = wordWithoutFirstMinus(option);
    return pureLabel.includes(pureWord);
  });
};
