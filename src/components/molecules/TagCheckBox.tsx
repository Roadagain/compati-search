import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

type Props = {
  /**
   * タグ
   */
  label: string;
  /**
   * チェックされたかどうか
   */
  checked: boolean;
  /**
   * マイナス指定かどうか
   */
  minusChecked?: boolean;
  /**
   * チェック状態が変わったときの挙動
   */
  onChange: (checked: boolean) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
};

export const TagCheckBox: React.FC<Props> = ({
  label,
  checked,
  minusChecked,
  onChange,
  sx,
}) => {
  const onChangeCheckbox = (_, checked: boolean) => {
    onChange(checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked || minusChecked}
          indeterminate={minusChecked}
          onChange={onChangeCheckbox}
          color={minusChecked ? 'error' : 'primary'}
        />
      }
      label={label}
      sx={sx}
    />
  );
};
