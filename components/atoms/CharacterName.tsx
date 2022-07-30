import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
  /**
   * キャラクター名
   */
  children: string;
}

export const CharacterName: React.FC<Props> = ({ children }) => (
  <Typography>{children}</Typography>
)
