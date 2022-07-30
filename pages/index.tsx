import React from 'react';
import { loadSampleCharactersData } from '../lib/load-data';
import { Container } from '@mui/material';
import { CharactersSearcher } from '../components/organisms/CharactersSearcher';
import { TaggedCharacter } from '../lib/tagged-character';

const Index: React.FC = () => {
  const [characters, setCharacters] = React.useState<TaggedCharacter[]>([]);
  React.useEffect(() => {
    setCharacters(loadSampleCharactersData());
  }, []);
  return (
    <main>
      <Container>
        <p>character-tag-searcher</p>
        <CharactersSearcher characters={characters} />
      </Container>
    </main>
  );
};

export default Index;
