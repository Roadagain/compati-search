import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Ship } from '../../lib/ship';
import { TagBadge } from '../atoms/TagBadge';
import { CategorizedTags } from './CategorizedTags';

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
        <Stack direction="column" spacing={1}>
          <Typography
            variant="h5"
            component="span"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <TagBadge onClick={onClickTag}>{category}</TagBadge>
            <TagBadge onClick={onClickTag}>{type}</TagBadge>
          </Stack>
        </Stack>
        <Divider sx={{ mt: 1 }} />
        <CategorizedTags
          label="速力"
          tags={[speed]}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
        <CategorizedTags
          label="射程"
          tags={[range]}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
        <CategorizedTags
          label="装備"
          tags={equipments}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
        <CategorizedTags
          label="特性"
          tags={abilities}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};
