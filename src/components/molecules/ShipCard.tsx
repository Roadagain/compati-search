import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Ship } from '../../lib/ship';
import { TagCategory } from '../../lib/tag-category';
import { TagBadge } from '../atoms/TagBadge';
import { CategorizedTags } from './CategorizedTags';

type Props = {
  /**
   * 艦船データ
   */
  ship: Ship;
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

export const ShipCard: React.FC<Props> = ({ ship, onClickTag, sx }) => {
  const { name, category, type, speed, range, equipments, abilities } = ship;
  const theme = useTheme();
  return (
    <Accordion
      elevation={2}
      disableGutters
      TransitionProps={{ unmountOnExit: true }}
      sx={sx}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction="column" spacing={1} minWidth={0}>
          <Typography variant="h5" component="p" noWrap>
            {name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <TagBadge
              category="categories"
              tag={category}
              onClick={onClickTag}
            />
            <TagBadge category="types" tag={type} onClick={onClickTag} />
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{ borderTop: '1px solid', borderColor: theme.palette.divider }}
      >
        <CategorizedTags
          category="speeds"
          tags={[speed]}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
        <CategorizedTags
          category="ranges"
          tags={[range]}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
        <CategorizedTags
          category="equipments"
          tags={equipments}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
        <CategorizedTags
          category="abilities"
          tags={abilities}
          onClickTag={onClickTag}
          sx={{ mt: 1 }}
        />
      </AccordionDetails>
    </Accordion>
  );
};
