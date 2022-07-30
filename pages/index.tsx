import React from 'react';
import { loadSampleCharactersData } from '../lib/load-data';
import { Box, Container, Typography } from '@mui/material';
import { CharactersSearcher } from '../components/organisms/CharactersSearcher';
import { TaggedCharacter } from '../lib/tagged-character';

const Index: React.FC = () => {
  const [characters, setCharacters] = React.useState<TaggedCharacter[]>([]);
  React.useEffect(() => {
    setCharacters(loadSampleCharactersData());
  }, []);
  return (
    <Container>
      <Box sx={{ p: 1 }}>
        <Typography variant="h5">互換キャラサーチ</Typography>
      </Box>
      <CharactersSearcher characters={characters} />
    </Container>
  );
};

export default Index;
