import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { AllSearchTargetLabels } from '../../lib/search-target';
import { TagCategory } from '../../lib/tag-category';
import { TagBadge } from '../atoms/TagBadge';

type Props = {
  /**
   * タグの種類
   */
  category: TagCategory;
  /**
   * 表示するタグ一覧
   */
  tags: string[];
  /**
   * タグクリック時のハンドラ
   * @param category - タグの種類
   * @param tag - タグ
   */
  onClickTag: (category: TagCategory, tag: string) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
};

export const CategorizedTags: React.FC<Props> = ({
  category,
  tags,
  onClickTag,
  sx,
}) => {
  const label = AllSearchTargetLabels[category];
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      minHeight="2rem"
      sx={sx}
    >
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
            <TagBadge
              key={tag}
              category={category}
              tag={tag}
              onClick={onClickTag}
            />
          ))
        ) : (
          <Typography>なし</Typography>
        )}
      </Stack>
    </Stack>
  );
};
