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
  tagLabels: string[];
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

export const CharacterCard: React.FC<Props> = ({
  name,
  tagLabels,
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
        {tagLabels.map((tagLabel) => (
          <TagBadge key={tagLabel} onClick={onClickTag}>
            {tagLabel}
          </TagBadge>
        ))}
      </Stack>
    </CardContent>
  </Card>
);
