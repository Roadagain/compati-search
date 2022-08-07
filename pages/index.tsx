import React from 'react';
import { loadSampleCharactersData } from '../lib/load-data';
import { Box, Container, Typography } from '@mui/material';
import { CharactersSearcher } from '../components/organisms/CharactersSearcher';
import { TaggedCharacter } from '../lib/tagged-character';
import { GetStaticProps, NextPage } from 'next';

interface Props {
  characters: TaggedCharacter[]
}

const Index: NextPage<Props> = ({ characters }) => (
    <Container>
      <Box sx={{ p: 1 }}>
        <Typography variant="h5">互換キャラサーチ</Typography>
      </Box>
      <CharactersSearcher characters={characters} />
    </Container>
  );

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      characters: loadSampleCharactersData()
    }
  }
}

export default Index;
