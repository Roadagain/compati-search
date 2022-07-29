import React from 'react';
import { loadSampleCharactersData } from '../lib/load-data';

const Index: React.FC = () => {
  React.useEffect(() => {
    console.log('characters data', loadSampleCharactersData());
  });
  return <main>character-tag-searcher</main>;
};

export default Index;
