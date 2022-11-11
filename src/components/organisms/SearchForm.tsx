import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

import { FluxContext } from '../../flux/context';
import { generateAutocompleteOptions } from '../../lib/autocomplete';
import { generateSearchTargets, SearchTarget } from '../../lib/search-target';
import { AutocompleteForm } from '../molecules/AutocompleteForm';
import { SearchTargetSelect } from '../molecules/SearchTargetSelect';

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
  const searchTargets = React.useMemo(
    () => generateSearchTargets(state.characters.flatMap(({ tags }) => tags)),
    [state.characters]
  );
  const autocompleteOptions = generateAutocompleteOptions(
    state.characters,
    target.type,
    showAll
  );
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const form = (
    <Stack
      component="form"
      direction={isTabletOrDesktop ? 'row' : 'column'}
      alignItems={isTabletOrDesktop ? 'center' : 'stretch'}
      spacing={2}
      sx={isTabletOrDesktop ? sx : undefined}
    >
      <SearchTargetSelect
        value={target}
        targets={searchTargets}
        onChange={onChangeTarget}
      />
      <AutocompleteForm
        type={target.type}
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
