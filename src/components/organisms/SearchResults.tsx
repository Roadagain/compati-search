import Grid from '@mui/material/Grid';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';

import { FluxContext } from '../../flux/context';
import { TagCategory } from '../../lib/tag-category';
import { ShipCard } from '../molecules/ShipCard';

interface Props {
  /**
   * テーマ関連のスタイル指定
   */
  sx: SxProps<Theme>;
}

export const SearchResults: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { results: ships, page } = state.search;
  const onClickTag = React.useCallback(
    (category: TagCategory, tag: string) => {
      dispatch({ type: 'click-tag', category, tag });
    },
    [dispatch]
  );
  const loadMore = React.useCallback(() => {
    // react-infinite-scrollerはpageをリセットできないためflux側で管理する
    dispatch({
      type: 'show-next-page',
    });
  }, [dispatch]);
  // 追加は24個ずつ
  const shownShips = ships.slice(0, page * 24);
  const hasMore = shownShips.length < ships.length;

  return (
    <InfiniteScroller loadMore={loadMore} hasMore={hasMore}>
      <Grid container spacing={2} sx={sx}>
        {shownShips.map((ship) => (
          <Grid item key={ship.name} xs={12} sm={6} md={4}>
            <ShipCard ship={ship} onClickTag={onClickTag} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroller>
  );
};
