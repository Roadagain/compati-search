import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  /**
   * タグ
   */
  children: string;
}

export const TagBadge: React.FC<Props> = ({ children }) => (
  <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>
    {children}
  </Button>
);
