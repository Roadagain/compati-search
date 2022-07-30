import React from 'react';
import { loadSampleCharactersData } from '../lib/load-data';
import { Container, Typography } from '@mui/material';
import { CharactersSearcher } from '../components/organisms/CharactersSearcher';
import { TaggedCharacter } from '../lib/tagged-character';

const Index: React.FC = () => {
  const [characters, setCharacters] = React.useState<TaggedCharacter[]>([]);
  React.useEffect(() => {
    setCharacters(loadSampleCharactersData());
  }, []);
  return (
    <Container>
      <Typography variant="h6">character-tag-searcher</Typography>
      <CharactersSearcher characters={characters} />
    </Container>
  );
};

export default Index;
