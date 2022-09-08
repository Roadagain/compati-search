import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import React from 'react';

import { SearchTarget } from '../../lib/search-target';

interface Props {
  /**
   * 検索対象
   */
  target: SearchTarget;
  /**
   * 検索対象変更時のハンドラ
   * @param value - 新しい検索対象
   */
  onChange: (value: SearchTarget) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchTargetSelect: React.FC<Props> = ({
  target,
  onChange,
  sx,
}) => {
  const onSelect = React.useCallback(
    (event: SelectChangeEvent<number>) => {
      const { value } = event.target;
      switch (value) {
        case SearchTarget.TAG:
        case SearchTarget.NAME:
          onChange(value);
          return;
        default:
          throw new Error('Invalid search target');
      }
    },
    [onChange]
  );
  const theme = useTheme();

  return (
    <Select
      value={target}
      onChange={onSelect}
      sx={{
        fontSize: theme.typography.h6,
        ...sx,
      }}
    >
      <MenuItem value={SearchTarget.TAG}>タグで検索する</MenuItem>
      <MenuItem value={SearchTarget.NAME}>名前で検索する</MenuItem>
    </Select>
  );
};
