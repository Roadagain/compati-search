import React from 'react';
import Button from '@mui/material/Button';

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
}

export const TagBadge: React.FC<Props> = ({ children, onClick }) => (
  <Button
    size="small"
    variant="outlined"
    onClick={() => onClick(children)}
    sx={{ textTransform: 'none' }}
  >
    {children}
  </Button>
);
