import FormControlLabel from '@mui/material/FormControlLabel';
import { SxProps, Theme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import React from 'react';

interface Props {
  /**
   * スイッチONかOFFか
   */
  checked: boolean;
  /**
   * スイッチ時のハンドラ
   */
  onChange: (checked: boolean) => void;
  /**
   * テーマ関連のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const ShowAllCharactersSwitch: React.FC<Props> = ({
  checked,
  onChange,
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
      control={<Switch checked={checked} onChange={onChangeSwitch} />}
      label="全改造段階を表示"
      sx={sx}
    />
  );
};
