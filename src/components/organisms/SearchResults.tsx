import { Grid, SxProps, Theme } from '@mui/material';
import React from 'react';
import { FluxContext } from '../../flux/context';
import { CharacterCard } from '../molecules/CharacterCard';

interface Props {
  /**
   * テーマ関連のスタイル指定
   */
  sx: SxProps<Theme>;
}

export const SearchResults: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const characters = state.search.results;
  const onClickTag = React.useCallback(
    (label: string) => {
      dispatch({ type: 'click-tag', label });
    },
    [dispatch]
  );

  return (
    <Grid container spacing={2} sx={sx}>
      {characters.map(({ name, tags }) => (
        <Grid item key={name} xs={12} sm={6} md={4}>
          <CharacterCard name={name} tags={tags} onClickTag={onClickTag} />
        </Grid>
      ))}
    </Grid>
  );
};
