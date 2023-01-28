import { SearchTarget, SearchType } from './search-target';
import { Ship } from './ship';

export const uniqueAndSortTagLabels = (tagLabels: string[]): string[] => {
  return Array.from(new Set(tagLabels)).sort();
};

export const generateAutocompleteOptions = (
  ships: Ship[],
  target: SearchTarget,
  showAll: boolean
): string[] => {
  const shipsShown = ships.filter(({ showDefault }) => showAll || showDefault);
  switch (target.type) {
    case SearchType.TAG:
      return uniqueAndSortTagLabels(
        shipsShown
          .flatMap(({ tags }) => tags)
          .filter(({ category }) => category === target.category)
          .map(({ label }) => label)
      );
    case SearchType.NAME:
      return shipsShown.map(({ name }) => name);
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
