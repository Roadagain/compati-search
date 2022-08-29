import { SearchTemplate } from '../components/templates/SearchTemplate';
import { NextPage } from 'next';
import { useCharactersData } from '../hooks/characters-data';

const Index: NextPage = () => {
  const [characters] = useCharactersData('sample');

  return <SearchTemplate characters={characters} />;
};

export default Index;
