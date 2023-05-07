import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { FluxContext } from '../../flux/context';
import { SearchTarget } from '../../lib/search-target';
import { AllTagCategories } from '../../lib/tag-category';
import { AutocompleteForm } from '../molecules/AutocompleteForm';
import { TagSelector } from '../molecules/TagSelector';

type Props = {
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
};

export const FullSearchForm: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { info, words } = state.search;
  const { autocompleteOptions } = info;
  const onChangeCurried = React.useCallback(
    (target: SearchTarget) => (words: string[]) => {
      dispatch({ type: 'change-search-words', target, words });
    },
    [dispatch]
  );

  return (
    <Accordion elevation={2} sx={sx}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="p" variant="h6">
          検索フォーム
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {AllTagCategories.map((category) => {
          const onChange = onChangeCurried(category);
          return (
            <TagSelector
              key={category}
              category={category}
              tags={autocompleteOptions[category]}
              selectedTags={words[category]}
              onChange={onChange}
            />
          );
        })}
        <AutocompleteForm
          target="names"
          words={words.names}
          autocompleteOptions={autocompleteOptions.names}
          onChange={onChangeCurried('names')}
        />
      </AccordionDetails>
    </Accordion>
  );
};
