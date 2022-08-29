import React from 'react';
import { Container, LinearProgress, Typography } from '@mui/material';
import { CharactersSearcher } from '../../components/organisms/CharactersSearcher';
import { useCharactersData } from '../../hooks/characters-data';

export interface Props {
  /**
   * データ名
   */
  dataName: string;
}

export const SearchTemplate: React.FC<Props> = ({ dataName }) => {
  const [characters, isLoading] = useCharactersData(dataName);
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h5">コンパチサーチ</Typography>
      <CharactersSearcher characters={characters} sx={{ mt: 2 }} />
    </Container>
  );
};
