import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import React from 'react';

import { SearchTarget, SearchType } from '../../lib/search-target';

interface Props {
  /**
   * 検索対象
   */
  type: SearchType;
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

export const SearchTypeSelect: React.FC<Props> = ({ type, onChange, sx }) => {
  const onSelect = React.useCallback(
    (event: SelectChangeEvent<number>) => {
      const { value } = event.target;
      switch (value) {
        case SearchType.TAG:
        case SearchType.NAME:
          onChange({ type: value });
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
      value={type}
      onChange={onSelect}
      sx={{
        fontSize: theme.typography.h6,
        ...sx,
      }}
    >
      <MenuItem value={SearchType.TAG}>タグで検索する</MenuItem>
      <MenuItem value={SearchType.NAME}>名前で検索する</MenuItem>
    </Select>
  );
};
