import React from 'react';
import { Container, LinearProgress, Typography } from '@mui/material';
import { FluxContext } from '../../flux/context';
import { SearchForm } from '../organisms/SearchForm';
import { SearchCondition } from '../organisms/SearchCondition';
import { SearchResults } from '../organisms/SearchResults';
import { loadCharactersDataFromJson } from '../../lib/load-data';

export interface Props {
  /**
   * データ名
   */
  dataName: string;
}

export const SearchTemplate: React.FC<Props> = ({ dataName }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  React.useEffect(() => {
    fetch(`/api/characters-data/${dataName}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Not Found');
        }
        return res.json();
      })
      .then(loadCharactersDataFromJson)
      .then((charactersData) => {
        dispatch({
          type: 'load-characters-data',
          charactersData,
        });
      })
      .catch(console.error);
  }, [dataName, dispatch]);

  if (!state.isReady) {
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
