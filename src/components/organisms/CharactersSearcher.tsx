import { Grid, SxProps, Theme } from '@mui/material';
import React from 'react';
import {
  filterCharactersByNameWords,
  filterCharactersByTags,
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

interface SearchCondition {
  target: SearchTarget;
  text: string;
}

export const CharactersSearcher: React.FC<Props> = ({ characters, sx }) => {
  const [searchTexts, setSearchTexts] = React.useState<string[]>([]);
  const [searchTarget, setSearchTarget] = React.useState(SearchTarget.TAG);
  const [searchResults, setSearchResults] = React.useState<TaggedCharacter[]>(
    characters.filter(({ showDefault }) => showDefault)
  );
  const [searchCondition, setSearchCondition] = React.useState<SearchCondition>(
    { text: '', target: SearchTarget.TAG }
  );
  const [showAll, setShowAll] = React.useState(false);
  const search = (texts: string[], target: SearchTarget, showAll: boolean) => {
    const searchResults =
      target === SearchTarget.TAG
        ? filterCharactersByTags(characters, texts, showAll)
        : filterCharactersByNameWords(characters, texts, showAll);
    setSearchResults(searchResults);
    setSearchCondition({
      target,
      text: texts.join(' '),
    });
  };
  const onClickTag = (tag: string) => {
    setSearchTexts([tag]);
    setSearchTarget(SearchTarget.TAG);
    search([tag], SearchTarget.TAG, showAll);
  };
  const onChangeShowAll = (showAll: boolean) => {
    setShowAll(showAll);
    const texts = searchCondition.text ? searchCondition.text.split(' ') : [];
    search(texts, searchCondition.target, showAll);
  };
  const onChangeSearchTexts = (newTexts: string[]) => {
    setSearchTexts(newTexts);
    search(newTexts, searchTarget, showAll);
  };
  const onChangeSearchTarget = (newTarget: SearchTarget) => {
    setSearchTarget(newTarget);
    search(searchTexts, newTarget, showAll);
  };
  const autocompleteOptions = generateAutocompleteOptions(
    characters,
    searchTarget,
    showAll
  );

  return (
    <Box sx={sx}>
      <SearchForm
        texts={searchTexts}
        onChangeTexts={onChangeSearchTexts}
        target={searchTarget}
        onChangeTarget={onChangeSearchTarget}
        autocompleteOptions={autocompleteOptions}
      />
      <SearchCondition
        {...searchCondition}
        showAll={showAll}
        onChangeShowAll={onChangeShowAll}
        sx={{ mt: 2 }}
      />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {searchResults.map(({ name, tags }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <CharacterCard name={name} tags={tags} onClickTag={onClickTag} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
