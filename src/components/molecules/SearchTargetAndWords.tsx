import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { SearchTarget } from '../../lib/search-target';

interface Props {
  /**
   * 検索対象
   */
  target: SearchTarget;
  /**
   * 検索ワード
   */
  words: string[];
  /**
   * テーマ関連のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchTargetAndWords: React.FC<Props> = ({
  target,
  words,
  sx,
}) => {
  const targetStr = target === SearchTarget.TAG ? 'タグ' : '名前';
  const variant = 'h6';

  return (
    <Typography component="h2" variant={variant} sx={sx}>
      {words.length ? (
        <>
          {words.map((word) => {
            const color = word.startsWith('-') ? 'error' : 'default';
            return (
              <Typography
                key={word}
                component="span"
                variant={variant}
                fontWeight="bold"
                color={color}
              >
                {word}&nbsp;
              </Typography>
            );
          })}
          の{targetStr}検索結果
        </>
      ) : (
        '検索条件なし'
      )}
    </Typography>
  );
};
