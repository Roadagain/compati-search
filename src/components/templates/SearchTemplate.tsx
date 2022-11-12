'use client';

import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

import shipsData from '../../../characters-data/ships.json';
import { FluxContext } from '../../flux/context';
import { FullSearchForm } from '../organisms/FullSearchForm';
import { SearchConditionSummary } from '../organisms/SearchConditionSummary';
import { SearchResults } from '../organisms/SearchResults';

export const SearchTemplate: React.FC = () => {
  const { state, dispatch } = React.useContext(FluxContext);
  React.useEffect(() => {
    dispatch({
      type: 'load-characters-data',
      charactersData: shipsData,
    });
  }, [dispatch]);

  if (!state.isReady) {
    return <LinearProgress />;
  }
  return (
    <Container sx={{ py: 2 }}>
      <Typography component="h1" variant="h6">
        互艦サーチ
      </Typography>
      <FullSearchForm sx={{ mt: 2 }} />
      <SearchConditionSummary sx={{ mt: 2 }} />
      <SearchResults sx={{ mt: 1 }} />
    </Container>
  );
};
