import { Stack, SxProps, Theme } from '@mui/material';
import React from 'react';
import { FluxContext } from '../../flux/context';
import { SearchTargetAndWords } from '../molecules/SearchTargetAndWords';
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
  const onChangeSwitch = React.useCallback(
    (showAll: boolean) => {
      dispatch({ type: 'change-show-all', showAll });
    },
    [dispatch]
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={sx}
    >
      <SearchTargetAndWords target={target} words={words} />
      <ShowAllCharactersSwitch
        checked={showAll}
        character={character}
        onChange={onChangeSwitch}
      />
    </Stack>
  );
};
