import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { SearchForm } from './SearchForm';
import Box from '@mui/material/Box';
import { SearchCondition } from '../molecules/SearchCondition';
import { CharactersList } from './CharactersList';
import { CharactersData } from '../../lib/characters-data';
import { FluxContext } from '../../flux/context';

interface Props {
  /**
   * 検索対象のキャラクター一覧
   */
  charactersData: CharactersData;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const CharactersSearcher: React.FC<Props> = ({ charactersData, sx }) => {
  const { characters, metadata } = charactersData;
  const { state, dispatch } = React.useContext(FluxContext);
  React.useEffect(() => {
    dispatch({
      type: 'load-characters',
      characters,
    });
  }, [dispatch, characters]);
  const { target: searchTarget, words: searchTexts, showAll } = state.search;

  const onChangeShowAll = React.useCallback(
    (showAll: boolean) => {
      dispatch({ type: 'change-show-all', showAll });
    },
    [dispatch]
  );

  return (
    <Box sx={sx}>
      <SearchForm />
      <SearchCondition
        target={searchTarget}
        texts={searchTexts}
        showAll={showAll}
        onChangeShowAll={onChangeShowAll}
        character={metadata.character}
        sx={{ mt: 2 }}
      />
      <CharactersList sx={{ mt: 1 }} />
    </Box>
  );
};
