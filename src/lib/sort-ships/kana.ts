import { Ship } from '../ship';

export const compareKana = (a: string, b: string): number => {
  const isAKana = !!a.match(/^[あ-ん]/);
  const isBKana = !!b.match(/^[あ-ん]/);

  if ((isAKana && isBKana) || (!isAKana && !isBKana)) {
    return a.localeCompare(b);
  }
  if (isAKana) {
    return -1;
  }
  return 1;
};

export const sortByKana = (ships: Ship[]): Ship[] => {
  return ships.slice().sort((a, b) => compareKana(a.kana, b.kana));
};
