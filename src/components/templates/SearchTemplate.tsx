import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

import { FluxContext } from '../../flux/context';
import { fetchCharactersData } from '../../lib/fetch-data';
import { SearchCondition } from '../organisms/SearchCondition';
import { SearchForm } from '../organisms/SearchForm';
import { SearchResults } from '../organisms/SearchResults';

export interface Props {
  /**
   * データ名
   */
  dataName: string;
}

export const SearchTemplate: React.FC<Props> = ({ dataName }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  React.useEffect(() => {
    fetchCharactersData(dataName)
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
      <Typography component="h1" variant="h6">
        コンパチサーチ
      </Typography>
      <SearchForm sx={{ mt: 2 }} />
      <SearchCondition sx={{ mt: 2 }} />
      <SearchResults sx={{ mt: 1 }} />
    </Container>
  );
};
