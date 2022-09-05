import { SxProps, Theme, Typography } from '@mui/material';
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
  const joinedText = words.join(' ');
  const variant = 'h6';

  return (
    <Typography component="h5" variant={variant} sx={sx}>
      {joinedText ? (
        <>
          <Typography component="span" variant={variant} fontWeight="bold">
            {joinedText}
          </Typography>
          の{targetStr}検索結果
        </>
      ) : (
        '検索条件なし'
      )}
    </Typography>
  );
};
