import { Stack, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import { FluxContext } from '../../flux/context';
import { SearchTarget } from '../../lib/search-target';
import { ShowAllCharactersSwitch } from '../molecules/ShowAllCharactersSwitch';

interface Props {
  /**
   * キャラクターの呼称
   */
  character: string;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchCondition: React.FC<Props> = ({ character, sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { target, words, showAll } = state.search;
  const targetStr = target === SearchTarget.TAG ? 'タグ' : '名前';
  const onChangeSwitch = React.useCallback(
    (showAll: boolean) => {
      dispatch({ type: 'change-show-all', showAll });
    },
    [dispatch]
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
      <ShowAllCharactersSwitch
        checked={showAll}
        character={character}
        onChange={onChangeSwitch}
      />
    </Stack>
  );
};
