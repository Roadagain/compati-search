import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { TagBadge } from '../atoms/TagBadge';

interface Props {
  /**
   * タグの種類
   */
  label: string;
  /**
   * 表示するタグ一覧
   */
  tags: string[];
  /**
   * タグクリック時のハンドラ
   * @param tagLabel - タグ
   */
  onClickTag: (tagLabel: string) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const CategorizedTags: React.FC<Props> = ({
  label,
  tags,
  onClickTag,
  sx,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={sx}>
      <Typography flexShrink={0}>{label}</Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          overflowX: 'scroll',
        }}
      >
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagBadge key={tag} onClick={onClickTag}>
              {tag}
            </TagBadge>
          ))
        ) : (
          <Typography>なし</Typography>
        )}
      </Stack>
    </Stack>
  );
};
