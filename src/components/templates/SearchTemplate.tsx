import React from 'react';
import {
  Container,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  if (!state.isReady) {
    return <LinearProgress />;
  }
  return (
    <Container sx={{ py: 2 }}>
      <Typography component="h1" variant={isTabletOrDesktop ? 'h5' : 'h6'}>
        コンパチサーチ
      </Typography>
      <SearchForm sx={{ mt: 2 }} />
      <SearchCondition sx={{ mt: 2 }} />
      <SearchResults sx={{ mt: 1 }} />
    </Container>
  );
};
