import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { FluxContext } from '../../flux/context';
import { SearchTarget } from '../../lib/search-target';
import { Tag } from '../../lib/tag';
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
  const { tags } = state;
  const { nameAutocompleteOptions, words } = state.search;
  const onChangeCurried = React.useCallback(
    (target: SearchTarget) => (words: string[]) => {
      dispatch({ type: 'change-search-words', target, words });
    },
    [dispatch]
  );
  const categoryToTags = React.useMemo(() => {
    return tags.reduce((currentMap, tag) => {
      const { category } = tag;
      const tags = currentMap.get(category) || [];
      currentMap.set(category, [...tags, tag]);
      return currentMap;
    }, new Map<string, Tag[]>());
  }, [tags]);

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
          // 型的にnullableだけど、実際は常にnon-null
          const categoryTags = categoryToTags.get(category) || [];
          return (
            <TagSelector
              key={category}
              category={category}
              tags={categoryTags}
              selectedTags={words[category]}
              onChange={onChange}
            />
          );
        })}
        <AutocompleteForm
          target="names"
          words={words.names}
          autocompleteOptions={nameAutocompleteOptions}
          onChange={onChangeCurried('names')}
        />
      </AccordionDetails>
    </Accordion>
  );
};
