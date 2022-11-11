import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import React from 'react';

import { SearchTarget, SearchType } from '../../lib/search-target';

interface Props {
  /**
   * 今選択されている検索対象
   */
  value: SearchTarget;
  /**
   * 検索対象候補
   */
  targets: SearchTarget[];
  /**
   * 検索対象変更ハンドラ
   */
  onChange: (value: SearchTarget) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchTargetSelect: React.FC<Props> = ({
  value,
  targets,
  onChange,
  sx,
}) => {
  const onSelect = React.useCallback(
    (event: SelectChangeEvent<string>) => {
      const label = event.target.value;
      if (label === '名前') {
        onChange({
          type: SearchType.NAME,
        });
        return;
      }
      onChange({
        type: SearchType.TAG,
        category: label,
      });
    },
    [onChange]
  );
  const theme = useTheme();

  return (
    <Select
      value={'category' in value ? value.category : '名前'}
      onChange={onSelect}
      fullWidth
      sx={{
        fontSize: theme.typography.h6,
        ...sx,
      }}
    >
      {targets.map((target) => {
        const label = 'category' in target ? target.category : '名前';
        return (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        );
      })}
    </Select>
  );
};
