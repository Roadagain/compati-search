import { SearchTemplate } from '../components/templates/SearchTemplate';
import { NextPage } from 'next';
import { TaggedCharacter } from '../lib/tagged-character';
import { useEffect, useState } from 'react';
import { loadSampleCharactersData } from '../lib/load-data';

const Index: NextPage = () => {
  const [characters, setCharacters] = useState<TaggedCharacter[]>([]);
  useEffect(() => {
    setCharacters(loadSampleCharactersData());
  }, [])

  return <SearchTemplate characters={characters} />;
}

export default Index;
