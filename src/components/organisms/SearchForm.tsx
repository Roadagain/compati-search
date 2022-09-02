import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { SearchTargetSelect } from '../atoms/SearchTargetSelect';
import { SearchTarget } from '../../lib/search-target';
import { generateAutocompleteOptions } from '../../lib/autocomplete';
import { FluxContext } from '../../flux/context';
import { AutocompleteForm } from '../molecules/AutocompleteForm';

interface Props {
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchForm: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { target, words, showAll } = state.search;
  const onChangeTarget = React.useCallback(
    (target: SearchTarget) => {
      dispatch({ type: 'change-search-target', target });
    },
    [dispatch]
  );
  const onChangeWords = React.useCallback(
    (words: string[]) => {
      dispatch({ type: 'change-search-words', words });
    },
    [dispatch]
  );
  const autocompleteOptions = generateAutocompleteOptions(
    state.characters,
    target,
    showAll
  );

  return (
    <Box component="form" sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <SearchTargetSelect target={target} onChange={onChangeTarget} />
      <AutocompleteForm
        target={target}
        words={words}
        autocompleteOptions={autocompleteOptions}
        onChange={onChangeWords}
        sx={{ ml: 2 }}
      />
    </Box>
  );
};
