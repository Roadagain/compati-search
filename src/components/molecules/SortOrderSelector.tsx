import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import { getLabelOfSortOrder, SortOrder } from '../../lib/sort-characters';

interface Props {
  /**
   * 今のソート順
   */
  value: SortOrder;
  /**
   * ソート順変更のハンドラ
   */
  onChange: (sortOrder: SortOrder) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SortOrderSelector: React.FC<Props> = ({ value, onChange, sx }) => {
  const onChangeValue = (event: SelectChangeEvent<SortOrder>) => {
    if (typeof event.target.value !== 'string') {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl sx={sx}>
      <InputLabel id="sort-order-label">ソート順</InputLabel>
      <Select
        value={value}
        label="ソート順"
        labelId="sort-order-label"
        onChange={onChangeValue}
        sx={{ width: 200 }}
      >
        {Object.values(SortOrder).map((sortOrder) => {
          if (typeof sortOrder === 'string') {
            return null;
          }
          const label = getLabelOfSortOrder(sortOrder);
          return (
            <MenuItem value={sortOrder} key={label}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
