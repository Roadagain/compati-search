import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { SearchWord } from '../atoms/SearchWord';

interface Props {
  /**
   * 名前の検索ワード
   */
  nameWords: string[];
  /**
   * タグの検索ワード
   */
  tagWords: string[];
  /**
   * テーマ関連のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchTypeAndWords: React.FC<Props> = ({
  nameWords,
  tagWords,
  sx,
}) => {
  return (
    <Typography component="h2" variant="h6" sx={sx}>
      名前:
      {nameWords.length ? (
        <>
          {nameWords.map((word) => {
            return <SearchWord key={word} word={word} />;
          })}
        </>
      ) : (
        <Typography component="span" variant="h6" fontWeight="normal">
          条件なし
        </Typography>
      )}
      &nbsp; タグ:
      {tagWords.length ? (
        <>
          {tagWords.map((word) => {
            return (
              <>
                <SearchWord key={word} word={word} />
                &nbsp;
              </>
            );
          })}
        </>
      ) : (
        <Typography component="span" variant="h6" fontWeight="normal">
          条件なし
        </Typography>
      )}
    </Typography>
  );
};
