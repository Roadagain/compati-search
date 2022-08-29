import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
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
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h5">コンパチサーチ</Typography>
      {isLoading ? (
        <CircularProgress sx={{ textAlign: 'center' }} />
      ) : (
        <CharactersSearcher characters={characters} sx={{ mt: 2 }} />
      )}
    </Container>
  );
};
