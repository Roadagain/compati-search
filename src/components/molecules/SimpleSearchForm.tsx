import Grid from '@mui/material/Grid';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import { SearchTarget, SearchType } from '../../lib/search-target';
import { SearchTargetLabel } from '../atoms/SearchTargetLabel';
import { AutocompleteForm } from './AutocompleteForm';

interface Props {
  /**
   * 検索対象
   */
  target: SearchTarget;
  /**
   * 補完候補
   */
  autocompleteOptions: string[];
  /**
   * 今入力されているワード
   */
  words: string[];
  /**
   * ワード変更ハンドラ
   */
  onChange: (words: string[]) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SimpleSearchForm: React.FC<Props> = ({
  target,
  autocompleteOptions,
  words,
  onChange,
  sx,
}) => {
  const targetLabel =
    target.type === SearchType.NAME ? '名前' : target.category;

  return (
    <Grid
      container
      component="form"
      direction={{ sm: 'row', xs: 'column' }}
      alignItems={{ sm: 'center', xs: 'stretch' }}
      spacing={2}
      sx={sx}
    >
      <Grid item sm={12} md={2}>
        <SearchTargetLabel label={targetLabel} />
      </Grid>
      <Grid item sm={12} md={10}>
        <AutocompleteForm
          target={target}
          words={words}
          autocompleteOptions={autocompleteOptions}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};
