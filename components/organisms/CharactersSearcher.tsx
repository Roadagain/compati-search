import { Grid } from '@mui/material';
import React from 'react';
import {
  filterCharactersByNameWords,
  filterCharactersByTags,
  TaggedCharacter,
} from '../../lib/tagged-character';
import { CharacterCard } from '../molecules/CharacterCard';
import { SearchForm } from '../molecules/SearchForm';
import Box from '@mui/material/Box';
import { SearchTarget } from '../molecules/SearchTargetSelect';

interface Props {
  /**
   * 検索対象のキャラクター一覧
   */
  characters: TaggedCharacter[];
}

export const CharactersSearcher: React.FC<Props> = ({ characters }) => {
  const [searchResults, setSearchResults] = React.useState<TaggedCharacter[]>(
    []
  );
  const search = (text: string, target: SearchTarget) => {
    const words = text.split(/\s/);
    const searchResults =
      target === SearchTarget.TAG
        ? filterCharactersByTags(characters, words)
        : filterCharactersByNameWords(characters, words);
    setSearchResults(searchResults);
  };

  return (
    <Box>
      <SearchForm onSearch={search} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {searchResults.map(({ name, tags }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <CharacterCard name={name} tags={tags} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
