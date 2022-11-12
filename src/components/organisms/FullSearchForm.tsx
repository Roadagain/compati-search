import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { FluxContext } from '../../flux/context';
import { getKeyOfSearchTarget, SearchTarget } from '../../lib/search-target';
import { SimpleSearchForm } from '../molecules/SimpleSearchForm';

interface Props {
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const FullSearchForm: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { info, words } = state.search;
  const { autocompleteOptions, targets } = info;
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
        {targets.map((target) => {
          const key = getKeyOfSearchTarget(target);
          const onChange = onChangeCurried(target);
          return (
            <SimpleSearchForm
              key={key}
              target={target}
              words={words[key]}
              autocompleteOptions={autocompleteOptions[key]}
              onChange={onChange}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
