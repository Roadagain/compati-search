import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import {
  Collapse,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import React from 'react';
import { CategoryGroupedTag } from '../../lib/tagged-character';
import { TagBadge } from '../atoms/TagBadge';

interface Props extends CategoryGroupedTag {
  /**
   * タグクリック時のハンドラ
   * @param tagLabel - タグ
   */
  onClickTag: (tagLabel: string) => void;
  /**
   * テーマ関連のスタイル指定
   */
  sx: SxProps<Theme>;
}

export const CategorizedTags: React.FC<Props> = ({
  category,
  tags,
  onClickTag,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const switchTagsOpen = () => setExpanded((isTagsOpen) => !isTagsOpen);
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ overflowX: 'scroll' }}
    >
      <Typography>{category}</Typography>
      <Collapse in={expanded} orientation="horizontal">
        {/* 伸び縮みのとき縦に広がっちゃうのでどうにかしたい */}
        <Stack direction="row" spacing={1}>
          {tags.map(({ label }) => (
            <TagBadge key={label} onClick={onClickTag}>
              {label}
            </TagBadge>
          ))}
        </Stack>
      </Collapse>
      <IconButton onClick={switchTagsOpen}>
        {expanded ? <ArrowLeft /> : <ArrowRight />}
      </IconButton>
    </Stack>
  );
};
