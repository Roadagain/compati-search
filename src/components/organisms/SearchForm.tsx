import React from 'react';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { SearchTargetSelect } from '../atoms/SearchTargetSelect';
import { SearchTarget } from '../../lib/search-target';
import { generateAutocompleteOptions } from '../../lib/autocomplete';
import { FluxContext } from '../../flux/context';
import { AutocompleteForm } from '../molecules/AutocompleteForm';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

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
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const form = (
    <Stack
      component="form"
      direction={isTabletOrDesktop ? 'row' : 'column'}
      alignItems={isTabletOrDesktop ? 'center' : 'stretch'}
      spacing={2}
      sx={isTabletOrDesktop ? sx : undefined}
    >
      <SearchTargetSelect target={target} onChange={onChangeTarget} />
      <AutocompleteForm
        target={target}
        words={words}
        autocompleteOptions={autocompleteOptions}
        onChange={onChangeWords}
      />
    </Stack>
  );

  return isTabletOrDesktop ? (
    form
  ) : (
    <Accordion elevation={2} sx={sx}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="p" variant="h6">
          検索フォーム
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{form}</AccordionDetails>
    </Accordion>
  );
};
