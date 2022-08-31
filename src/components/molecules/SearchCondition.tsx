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
  /**
   * 検索対象
   */
  target: SearchTarget;
  /**
   * 検索文字列
   */
  texts: string[];
  /**
   * 全キャラ表示フラグ
   */
  showAll: boolean;
  /**
   * 全キャラ表示フラグの変更ハンドラ
   */
  onChangeShowAll: (showAll: boolean) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchCondition: React.FC<Props> = ({
  target,
  texts,
  showAll,
  onChangeShowAll,
  sx,
}) => {
  const targetStr = target === SearchTarget.TAG ? 'タグ' : '名前';
  const onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        onChangeShowAll(event.target.checked);
      },
      [onChangeShowAll]
    );
  const joinedText = texts.join(' ');

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={sx}
    >
      <Typography variant="h5">
        {joinedText ? (
          <>
            <Typography component="span" variant="h5" fontWeight="bold">
              {joinedText}
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
