import React from 'react';
import { Container, LinearProgress, Typography } from '@mui/material';
import { CharactersSearcher } from '../../components/organisms/CharactersSearcher';
import { useCharactersData } from '../../hooks/characters-data';
import { FluxProvider } from '../../flux/context';

export interface Props {
  /**
   * データ名
   */
  dataName: string;
}

export const SearchTemplate: React.FC<Props> = ({ dataName }) => {
  const { charactersData, isLoading } = useCharactersData(dataName);
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <FluxProvider>
      <Container sx={{ py: 2 }}>
        <Typography variant="h5">コンパチサーチ</Typography>
        <CharactersSearcher charactersData={charactersData} sx={{ mt: 2 }} />
      </Container>
    </FluxProvider>
  );
};
