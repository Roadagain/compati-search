import FormControlLabel from '@mui/material/FormControlLabel';
import { SxProps, Theme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import React from 'react';

interface Props {
  /**
   * ラベル
   */
  label: string;
  /**
   * スイッチONかOFFか
   */
  checked: boolean;
  /**
   * スイッチ時のハンドラ
   */
  onChange: (checked: boolean) => void;
  /**
   * 色
   */
  color?: 'primary' | 'error';
  /**
   * テーマ関連のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const LabelledSwitch: React.FC<Props> = ({
  label,
  checked,
  onChange,
  color,
  sx,
}) => {
  const onChangeSwitch: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        onChange(event.target.checked);
      },
      [onChange]
    );

  return (
    <FormControlLabel
      control={
        <Switch checked={checked} onChange={onChangeSwitch} color={color} />
      }
      label={label}
      sx={sx}
    />
  );
};
