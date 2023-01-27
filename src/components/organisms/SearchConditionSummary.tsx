import Stack from '@mui/material/Stack';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

import { FluxContext } from '../../flux/context';
import { SortOrder } from '../../lib/sort-characters';
import { SearchTypeAndWords } from '../molecules/SearchTypeAndWords';
import { ShowAllModelsSwitch } from '../molecules/ShowAllModelsSwitch';
import { SortOrderSelector } from '../molecules/SortOrderSelector';

interface Props {
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchConditionSummary: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { words, showAll, sortOrder } = state.search;
  const onChangeSortOrder = React.useCallback(
    (sortOrder: SortOrder) => {
      dispatch({ type: 'change-sort-order', sortOrder });
    },
    [dispatch]
  );
  const onChangeSwitch = React.useCallback(
    (showAll: boolean) => {
      dispatch({ type: 'change-show-all', showAll });
    },
    [dispatch]
  );
  const nameWords = words.name;
  const tagWords = Array.from(
    new Set(
      Object.entries(words)
        .filter(([key]) => key !== 'name')
        .flatMap(([, words]) => words)
    )
  );
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack
      direction={isTabletOrDesktop ? 'row' : 'column'}
      alignItems={isTabletOrDesktop ? 'center' : 'stretch'}
      justifyContent={isTabletOrDesktop ? 'space-between' : 'flex-start'}
      spacing={1}
      sx={sx}
    >
      <SearchTypeAndWords
        nameWords={nameWords}
        tagWords={tagWords}
        sx={{ flex: 1 }}
      />
      <SortOrderSelector value={sortOrder} onChange={onChangeSortOrder} />
      <ShowAllModelsSwitch checked={showAll} onChange={onChangeSwitch} />
    </Stack>
  );
};
