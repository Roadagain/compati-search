import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { SearchForm } from './SearchForm';
import Box from '@mui/material/Box';
import { SearchCondition } from './SearchCondition';
import { SearchResults } from './SearchResults';
import { CharactersData } from '../../lib/characters-data';
import { FluxContext } from '../../flux/context';

interface Props {
  /**
   * 検索対象のキャラクター一覧
   */
  charactersData: CharactersData;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const CharactersSearcher: React.FC<Props> = ({ charactersData, sx }) => {
  const { characters, metadata } = charactersData;
  const { dispatch } = React.useContext(FluxContext);
  React.useEffect(() => {
    dispatch({
      type: 'load-characters',
      characters,
    });
  }, [dispatch, characters]);

  return (
    <Box sx={sx}>
      <SearchForm />
      <SearchCondition character={metadata.character} sx={{ mt: 2 }} />
      <SearchResults sx={{ mt: 1 }} />
    </Box>
  );
};
