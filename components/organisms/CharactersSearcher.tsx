import { Grid } from '@mui/material';
import React from 'react';
import {
  filterCharactersByTags,
  TaggedCharacter,
} from '../../lib/tagged-character';
import { CharacterCard } from '../molecules/CharacterCard';
import { SearchForm } from '../molecules/SearchForm';

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
  const search = (text: string) => {
    const tags = text.split(/\s/);
    setSearchResults(filterCharactersByTags(characters, tags));
  };

  return (
    <>
      <SearchForm onSearch={search} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {searchResults.map(({ name, tags }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <CharacterCard name={name} tags={tags} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
