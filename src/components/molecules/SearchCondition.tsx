import {
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import React from 'react';
import { SearchTarget } from '../../lib/search-target';

interface Props {
  target: SearchTarget;
  text: string;
  showAll: boolean;
  onChangeShowAll: (showAll: boolean) => void;
  sx?: SxProps<Theme>;
}

export const SearchCondition: React.FC<Props> = ({
  target,
  text,
  showAll,
  onChangeShowAll,
  sx,
}) => {
  const targetStr = target === SearchTarget.TAG ? 'タグ' : '名前';
  const onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onChangeShowAll(event.target.checked);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={sx}
    >
      <Typography variant="h5">
        {text ? (
          <>
            <Typography component="span" variant="h5" fontWeight="bold">
              {text}
            </Typography>
            の{targetStr}検索結果
          </>
        ) : (
          '検索条件なし'
        )}
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
