import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Ship } from '../../lib/ship';
import { TagBadge } from '../atoms/TagBadge';

interface Props {
  /**
   * 艦船データ
   */
  ship: Ship;
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

export const ShipCard: React.FC<Props> = ({ ship, onClickTag, sx }) => {
  const { name, category, type, speed, range, equipments, abilities } = ship;
  return (
    <Card elevation={2} sx={sx}>
      <CardContent>
        <Typography
          variant="h5"
          component="span"
          flex={1}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {name}
        </Typography>
        <Divider sx={{ mt: 1 }} />
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Typography>艦種</Typography>
          <TagBadge onClick={onClickTag}>{category}</TagBadge>
          <TagBadge onClick={onClickTag}>{type}</TagBadge>
        </Stack>
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Typography>速力</Typography>
          <TagBadge onClick={onClickTag}>{speed}</TagBadge>
        </Stack>
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Typography>射程</Typography>
          <TagBadge onClick={onClickTag}>{range}</TagBadge>
        </Stack>
        {/* スクロールバーがタグと被らないように下部余白を確保する */}
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Typography flexShrink={0}>装備</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflowX: 'scroll',
            }}
          >
            {equipments.length > 0 ? (
              equipments.map((tag) => (
                <TagBadge key={tag} onClick={onClickTag}>
                  {tag}
                </TagBadge>
              ))
            ) : (
              <Typography>なし</Typography>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Typography flexShrink={0}>特性</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflowX: 'scroll',
            }}
          >
            {abilities.length > 0 ? (
              abilities.map((tag) => (
                <TagBadge key={tag} onClick={onClickTag}>
                  {tag}
                </TagBadge>
              ))
            ) : (
              <Typography>なし</Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
