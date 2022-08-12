import React from 'react';
import {
  loadCharactersDataFromJson,
  loadSampleCharactersData,
} from '../lib/load-data';
import { Box, Container, Typography } from '@mui/material';
import { CharactersSearcher } from '../components/organisms/CharactersSearcher';
import { TaggedCharacter } from '../lib/tagged-character';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  characters: TaggedCharacter[];
}

const Index: NextPage<Props> = ({ characters }) => (
  <Container sx={{ py: 2 }}>
    <Typography variant="h5">コンパチサーチ</Typography>
    <Box sx={{ mt: 2 }}>
      <CharactersSearcher characters={characters} />
    </Box>
  </Container>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const dataName = context.query.data;
  if (!dataName || dataName === 'sample') {
    return {
      props: {
        characters: loadSampleCharactersData(),
      },
    };
  }

  const result = await fetch(
    `${process.env.CHARACTERS_DATA_STORAGE_URL}/${dataName}.json?alt=media`
  );
  const json = await result.json();
  return {
    props: {
      characters: loadCharactersDataFromJson(json),
    },
  };
};

export default Index;
