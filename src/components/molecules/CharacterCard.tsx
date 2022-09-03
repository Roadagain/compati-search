import {
  Box,
  Card,
  CardContent,
  CardHeader,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { TagBadge } from '../atoms/TagBadge';
import Stack from '@mui/material/Stack';
import { Tag } from '../../lib/tagged-character';
import { memoizedComponent } from '../../lib/memoized';

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

export const CharacterCard = memoizedComponent<React.FC<Props>>(
  ({ name, tags, onClickTag, sx }) => {
    const tagLabels = Array.from(new Set(tags.map(({ label }) => label)));
    const theme = useTheme();
    const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
      <Card elevation={2} sx={sx}>
        <CardHeader
          title={name}
          titleTypographyProps={{
            component: 'h5',
            variant: isTabletOrDesktop ? 'h5' : 'h6',
          }}
        />
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
  }
);
