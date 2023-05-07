import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

type Props = {
  /**
   * ワード
   */
  word: string;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
};

export const SearchWord: React.FC<Props> = ({ word, sx }) => {
  const isMinusWord = word.startsWith('-');
  const color = isMinusWord ? 'error' : 'default';
  return (
    <Typography
      component="span"
      variant="h6"
      fontWeight="normal"
      color={color}
      sx={sx}
    >
      {word}
    </Typography>
  );
};
