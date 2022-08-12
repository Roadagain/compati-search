import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material';
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
}

export const SearchTargetSelect: React.FC<Props> = ({ target, onChange }) => {
  const onSelect = (event: SelectChangeEvent<number>) => {
    const { value } = event.target;
    switch (value) {
      case SearchTarget.TAG:
      case SearchTarget.NAME:
        onChange(value);
        return;
      default:
        throw new Error('Invalid search target');
    }
  };
  const theme = useTheme();

  return (
    <Select
      value={target}
      onChange={onSelect}
      sx={{ fontSize: theme.typography.h5 }}
    >
      <MenuItem value={SearchTarget.TAG}>タグで検索する</MenuItem>
      <MenuItem value={SearchTarget.NAME}>名前で検索する</MenuItem>
    </Select>
  );
};
