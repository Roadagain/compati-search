import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import { Tag } from '../../lib/ship';
import { TagBadge } from '../atoms/TagBadge';

interface Props {
  /**
   * キャラ名
   */
  name: string;
  /**
   * タグ一覧
   */
  tags: Tag[];
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
  tags,
  onClickTag,
  sx,
}) => {
  const tagLabels = Array.from(new Set(tags.map(({ label }) => label)));

  return (
    <Card elevation={2} sx={sx}>
      <CardHeader title={name} />
      <CardContent>
        {/* スクロールバーがタグと被らないように下部余白を確保する */}
        <Box pb={1} sx={{ overflowX: 'scroll' }}>
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
        </Box>
      </CardContent>
    </Card>
  );
};
