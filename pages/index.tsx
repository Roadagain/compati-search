import React from 'react';
import { loadSampleCharactersData } from '../lib/load-data';
import { SampleButton } from '../components/atoms/SampleButton';

const Index: React.FC = () => {
  React.useEffect(() => {
    console.log('characters data', loadSampleCharactersData());
  });
  return (
    <main>
      <p>character-tag-searcher</p>
      <SampleButton>ボタン</SampleButton>
    </main>
  );
};

export default Index;
