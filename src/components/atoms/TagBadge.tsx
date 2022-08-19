import React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material';

interface Props {
  /**
   * タグ
   */
  children: string;
  /**
   * クリック時の挙動
   * @param tag - クリックされたタグ
   */
  onClick: (tag: string) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const TagBadge: React.FC<Props> = ({ children, onClick, sx }) => (
  <Button
    size="small"
    variant="outlined"
    onClick={() => onClick(children)}
    sx={{ textTransform: 'none', ...sx }}
  >
    {children}
  </Button>
);
