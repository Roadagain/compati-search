import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  /**
   * ボタンテキスト
   */
  children: string;
}

export const SampleButton: React.FC<Props> = ({ children }) => {
  return <Button variant="outlined">{children}</Button>;
};
