import { Grid, SxProps, Theme } from '@mui/material';
import React from 'react';
import {
  filterCharactersByNameWords,
  filterCharactersByTagLabels,
  TaggedCharacter,
} from '../../lib/tagged-character';
import { CharacterCard } from '../molecules/CharacterCard';
import { SearchForm } from '../molecules/SearchForm';
import Box from '@mui/material/Box';
import { SearchCondition } from '../molecules/SearchCondition';
import { generateAutocompleteOptions } from '../../lib/autocomplete';
import { SearchTarget } from '../../lib/search-target';

interface Props {
  /**
   * 検索対象のキャラクター一覧
   */
  characters: TaggedCharacter[];
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const CharactersSearcher: React.FC<Props> = ({ characters, sx }) => {
  const [searchResults, setSearchResults] = React.useState<TaggedCharacter[]>(
    characters.filter(({ showDefault }) => showDefault)
  );
  const search = (target: SearchTarget, texts: string[], showAll: boolean) => {
    const searchResults =
      target === SearchTarget.TAG
        ? filterCharactersByTagLabels(characters, texts, showAll)
        : filterCharactersByNameWords(characters, texts, showAll);
    setSearchResults(searchResults);
  };

  const [searchTarget, setSearchTarget] = React.useState(SearchTarget.TAG);
  const [searchTexts, setSearchTexts] = React.useState<string[]>([]);
  const [showAll, setShowAll] = React.useState(false);

  const onChangeSearchTarget = (newTarget: SearchTarget) => {
    setSearchTarget(newTarget);
    setSearchTexts([]);
    search(newTarget, [], showAll);
  };
  const onChangeSearchTexts = (newTexts: string[]) => {
    setSearchTexts(newTexts);
    search(searchTarget, newTexts, showAll);
  };
  const onChangeShowAll = (showAll: boolean) => {
    setShowAll(showAll);
    search(searchTarget, searchTexts, showAll);
  };
  const onClickTag = (tagLabel: string) => {
    setSearchTexts([tagLabel]);
    setSearchTarget(SearchTarget.TAG);
    search(SearchTarget.TAG, [tagLabel], showAll);
  };

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
        sx={{ mt: 2 }}
      />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {searchResults.map(({ name, tags }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <CharacterCard
              name={name}
              tagLabels={tags.map(({ label }) => label)}
              onClickTag={onClickTag}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
