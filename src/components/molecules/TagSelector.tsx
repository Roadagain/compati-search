import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Chip from '@mui/material/Chip';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { AllSearchTargetLabels } from '../../lib/search-target';
import { TagCategory } from '../../lib/tag-category';
import { TagCheckBox } from './TagCheckBox';

interface Props {
  /**
   * タグの種類
   */
  category: TagCategory;
  /**
   * タグ一覧
   */
  tags: string[];
  /**
   * 選択済みタグ一覧
   */
  selectedTags: string[];
  /**
   * 選択変更ハンドラ
   */
  onChange: (selectedTags: string[]) => void;
  /**
   * テーマ関連のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const TagSelector: React.FC<Props> = ({
  category,
  tags,
  selectedTags,
  onChange,
  sx,
}) => {
  const categoryLabel = AllSearchTargetLabels[category];
  const selectedTagMap = new Map(
    tags.map((tag) => [tag, selectedTags.includes(tag)])
  );
  const onChangeCurried = React.useCallback(
    (tag: string) => (checked: boolean) => {
      if (checked) {
        onChange([...selectedTags, tag]);
      }
      if (!checked) {
        onChange(selectedTags.filter((selectedTag) => selectedTag !== tag));
      }
    },
    [onChange, selectedTags]
  );

  return (
    <Accordion elevation={2} sx={sx}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography component="p" variant="h6" fontWeight="bold">
            {categoryLabel}
          </Typography>
          {selectedTags.map((selectedTag) => (
            <Chip key={selectedTag} label={selectedTag} />
          ))}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup row>
          {tags.map((tag) => {
            const onChange = onChangeCurried(tag);
            const checked = selectedTagMap.get(tag);
            return (
              <TagCheckBox
                key={tag}
                label={tag}
                checked={checked}
                onChange={onChange}
              />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
