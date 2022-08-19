import { Card, CardContent, CardHeader, SxProps, Theme } from '@mui/material';
import React from 'react';
import { TagBadge } from '../atoms/TagBadge';
import Stack from '@mui/material/Stack';

interface Props {
  /**
   * キャラ名
   */
  name: string;
  /**
   * タグ一覧
   */
  tags: string[];
  /**
   * タグクリック時のハンドラ
   * @param tag - タグ
   */
  onClickTag: (tag: string) => void;
  /**
   * テーマ関係のスタイルしてい
   */
  sx?: SxProps<Theme>;
}

export const CharacterCard: React.FC<Props> = ({
  name,
  tags,
  onClickTag,
  sx,
}) => (
  <Card elevation={2} sx={sx}>
    <CardHeader title={name} />
    <CardContent sx={{ overflowX: 'scroll' }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}
      >
        {tags.map((tag) => (
          <TagBadge key={tag} onClick={onClickTag}>
            {tag}
          </TagBadge>
        ))}
      </Stack>
    </CardContent>
  </Card>
);
