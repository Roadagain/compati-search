import { SxProps, Theme } from '@mui/material';
import React from 'react';
import {
  filterCharacters,
  TaggedCharacter,
} from '../../lib/tagged-character';
import { SearchForm } from '../molecules/SearchForm';
import Box from '@mui/material/Box';
import { SearchCondition } from '../molecules/SearchCondition';
import { generateAutocompleteOptions } from '../../lib/autocomplete';
import { SearchTarget } from '../../lib/search-target';
import { CharactersList } from './CharactersList';
import { CharactersData } from '../../lib/characters-data';

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
  const [searchResults, setSearchResults] = React.useState<TaggedCharacter[]>(
    []
  );
  React.useEffect(() => {
    const newSearchResults = characters.filter(
      ({ showDefault }) => showDefault
    );
    setSearchResults(newSearchResults);
  }, [characters]);
  const search = React.useCallback(
    (target: SearchTarget, texts: string[], showAll: boolean) => {
      const searchResults = filterCharacters(characters, target, texts, showAll);
      setSearchResults(searchResults);
    },
    [characters, setSearchResults]
  );

  const [searchTarget, setSearchTarget] = React.useState(SearchTarget.TAG);
  const [searchTexts, setSearchTexts] = React.useState<string[]>([]);
  const [showAll, setShowAll] = React.useState(false);

  const onChangeSearchTarget = React.useCallback(
    (newTarget: SearchTarget) => {
      setSearchTarget(newTarget);
      setSearchTexts([]);
      search(newTarget, [], showAll);
    },
    [setSearchTarget, setSearchTexts, showAll, search]
  );
  const onChangeSearchTexts = React.useCallback(
    (newTexts: string[]) => {
      setSearchTexts(newTexts);
      search(searchTarget, newTexts, showAll);
    },
    [setSearchTexts, searchTarget, showAll, search]
  );
  const onChangeShowAll = React.useCallback(
    (showAll: boolean) => {
      setShowAll(showAll);
      search(searchTarget, searchTexts, showAll);
    },
    [setShowAll, searchTarget, searchTexts, search]
  );
  const onClickTag = React.useCallback(
    (tagLabel: string) => {
      setSearchTexts([tagLabel]);
      setSearchTarget(SearchTarget.TAG);
      search(SearchTarget.TAG, [tagLabel], showAll);
    },
    [setSearchTarget, setSearchTexts, showAll, search]
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
