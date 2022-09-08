import React from 'react';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { FluxContext } from '../../flux/context';
import { SearchForm } from '../organisms/SearchForm';
import { SearchCondition } from '../organisms/SearchCondition';
import { SearchResults } from '../organisms/SearchResults';
import { fetchCharactersData } from '../../lib/fetch-data';

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
