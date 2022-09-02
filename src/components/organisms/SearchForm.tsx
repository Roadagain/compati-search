import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { SearchTargetSelect } from '../atoms/SearchTargetSelect';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, TextField } from '@mui/material';
import { SearchTarget } from '../../lib/search-target';
import { Tag } from '../../lib/tagged-character';
import {
  AutocompleteOption,
  generateAutocompleteOptions,
} from '../../lib/autocomplete';
import { FluxContext } from '../../flux/context';

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
    (_, values: (string | AutocompleteOption)[]) => {
      const words = values.map((value) => {
        return typeof value === 'string' ? value : value.label;
      });
      dispatch({ type: 'change-search-words', words });
    },
    [dispatch]
  );
  const autocompleteOptions = generateAutocompleteOptions(
    state.characters,
    target,
    showAll
  );
  const theme = useTheme();
  const placeholder = `${target === SearchTarget.TAG ? 'タグ' : '名前'}を入力`;

  return (
    <Box component="form" sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <SearchTargetSelect target={target} onChange={onChangeTarget} />
      <Autocomplete
        autoComplete
        freeSolo
        multiple
        filterSelectedOptions
        value={words}
        onChange={onChangeWords}
        options={autocompleteOptions}
        groupBy={
          target === SearchTarget.TAG
            ? (option: Tag) => option.category
            : undefined
        }
        isOptionEqualToValue={(option: AutocompleteOption, value: string) =>
          option.label === value
        }
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            placeholder={placeholder}
            inputProps={{
              ...params.inputProps,
              sx: { fontSize: theme.typography.h5 },
            }}
          />
        )}
        renderTags={(values: string[], getTagProps) =>
          values.map((value, index) => (
            <Chip
              key={value}
              label={value}
              {...getTagProps({ index })}
              sx={{ fontSize: theme.typography.h6 }}
            />
          ))
        }
        sx={{ ml: 2 }}
      />
    </Box>
  );
};
