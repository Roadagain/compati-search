import { FormControlLabel, Switch, SxProps, Theme } from '@mui/material';
import React from 'react';

interface Props {
  /**
   * スイッチONかOFFか
   */
  checked: boolean;
  /**
   * キャラクターの呼称
   */
  character: string;
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
  character,
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
      label={`全${character}を表示`}
      sx={sx}
    />
  );
};
