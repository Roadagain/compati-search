import Grid from '@mui/material/Grid';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';

import { FluxContext } from '../../flux/context';
import { CharacterCard } from '../molecules/CharacterCard';

interface Props {
  /**
   * テーマ関連のスタイル指定
   */
  sx: SxProps<Theme>;
}

export const SearchResults: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { results: characters, page } = state.search;
  const onClickTag = React.useCallback(
    (label: string) => {
      dispatch({ type: 'click-tag', label });
    },
    [dispatch]
  );
  const loadMore = React.useCallback(() => {
    // react-infinite-scrollerはpageをリセットできないためflux側で管理する
    dispatch({
      type: 'show-next-page',
    });
  }, [dispatch]);
  // 追加は12個ずつ
  // PCやタブレットだとファーストビューで12+α見えるため、初回だけ2ページ分表示する
  const shownCharacters = characters.slice(0, page * 12);
  const hasMore = shownCharacters.length < characters.length;

  return (
    <InfiniteScroller loadMore={loadMore} hasMore={hasMore}>
      <Grid container spacing={2} sx={sx}>
        {shownCharacters.map(({ name, tags }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <CharacterCard name={name} tags={tags} onClickTag={onClickTag} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroller>
  );
};
