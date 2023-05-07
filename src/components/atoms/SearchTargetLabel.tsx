import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

type Props = {
  /**
   * 検索対象の名前
   */
  label: string;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
};

export const SearchTargetLabel: React.FC<Props> = ({ label, sx }) => (
  <Typography variant="h6" sx={sx}>
    {label}
  </Typography>
);
