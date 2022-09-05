import moize from 'moize';

export const memoizedComponent = moize.compose(
  // moize.reactを使うと各インスタンスごとのメモ化になる(React.memoと同様)
  // 全体を通してのメモ化がしたいので、shallowとmaxArgs(2)で対応
  // https://planttheidea.github.io/moize/#isreact
  moize.shallow,
  moize.maxArgs(2),
  moize.infinite
);
