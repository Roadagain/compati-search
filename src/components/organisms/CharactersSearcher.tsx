import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { SearchForm } from '../molecules/SearchForm';
import Box from '@mui/material/Box';
import { SearchCondition } from '../molecules/SearchCondition';
import { generateAutocompleteOptions } from '../../lib/autocomplete';
import { SearchTarget } from '../../lib/search-target';
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
  const {
    target: searchTarget,
    words: searchTexts,
    showAll,
    results: searchResults,
  } = state.search;

  const onChangeSearchTarget = React.useCallback(
    (target: SearchTarget) => {
      dispatch({ type: 'change-search-target', target });
    },
    [dispatch]
  );
  const onChangeSearchTexts = React.useCallback(
    (words: string[]) => {
      dispatch({ type: 'change-search-words', words });
    },
    [dispatch]
  );
  const onChangeShowAll = React.useCallback(
    (showAll: boolean) => {
      dispatch({ type: 'change-show-all', showAll });
    },
    [dispatch]
  );
  const onClickTag = React.useCallback(
    (label: string) => {
      dispatch({ type: 'click-tag', label });
    },
    [dispatch]
  );

  const autocompleteOptions = generateAutocompleteOptions(
    characters,
    searchTarget,
    showAll
  );

  return (
    <Box sx={sx}>
      <SearchForm
        target={searchTarget}
        onChangeTarget={onChangeSearchTarget}
        texts={searchTexts}
        onChangeTexts={onChangeSearchTexts}
        autocompleteOptions={autocompleteOptions}
      />
      <SearchCondition
        target={searchTarget}
        texts={searchTexts}
        showAll={showAll}
        onChangeShowAll={onChangeShowAll}
        character={metadata.character}
        sx={{ mt: 2 }}
      />
      <CharactersList
        characters={searchResults}
        onClickTag={onClickTag}
        sx={{ mt: 1 }}
      />
    </Box>
  );
};
