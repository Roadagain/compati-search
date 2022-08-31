import {
  Box,
  Card,
  CardContent,
  CardHeader,
  SxProps,
  Theme,
} from '@mui/material';
import React from 'react';
import { TagBadge } from '../atoms/TagBadge';
import Stack from '@mui/material/Stack';
import { Tag } from '../../lib/tagged-character';

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

export const CharacterCard: React.FC<Props> = React.memo(
  function CharacterCard({ name, tags, onClickTag, sx }) {
    const tagLabels = tags.map(({ label }) => label);
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
              {tagLabels.map((tagLabel, index) => (
                <TagBadge key={index} onClick={onClickTag}>
                  {tagLabel}
                </TagBadge>
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  }
);
