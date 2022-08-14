import {
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import React from 'react';
import { SearchTarget } from '../../lib/search-target';

interface Props {
  target: SearchTarget;
  text: string;
  showAll: boolean;
  onChangeShowAll: (showAll: boolean) => void;
}

export const SearchCondition: React.FC<Props> = ({
  target,
  text,
  showAll,
  onChangeShowAll,
}) => {
  const targetStr = target === SearchTarget.TAG ? 'タグ' : '名前';
  const onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onChangeShowAll(event.target.checked);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h5">
        <Typography component="span" variant="h5" fontWeight="bold">
          {text}
        </Typography>
        の{targetStr}検索結果
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={showAll} onChange={onChangeCheckbox} />}
          label="全キャラクターを表示"
        />
      </FormGroup>
    </Stack>
  );
};
