import { FormControlLabel, Switch } from '@mui/material';
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
}

export const ShowAllCharactersSwitch: React.FC<Props> = ({
  checked,
  character,
  onChange,
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
    />
  );
};
