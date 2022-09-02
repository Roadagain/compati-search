import React from 'react';
import { Container, LinearProgress, Typography } from '@mui/material';
import { FluxContext } from '../../flux/context';
import { SearchForm } from '../organisms/SearchForm';
import { SearchCondition } from '../organisms/SearchCondition';
import { SearchResults } from '../organisms/SearchResults';
import { loadCharactersDataFromJson } from '../../lib/load-data';
import { useCharactersData } from '../../hooks/characters-data';

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
    <Container sx={{ py: 2 }}>
      <Typography variant="h5">コンパチサーチ</Typography>
      <SearchForm sx={{ mt: 2 }} />
      <SearchCondition sx={{ mt: 2 }} />
      <SearchResults sx={{ mt: 1 }} />
    </Container>
  );
};
