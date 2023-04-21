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
import { LabelledSwitch } from './LabeledSwitch';
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
    tags.map((tag) => [
      tag,
      {
        checked: selectedTags.includes(tag),
        minusChecked: selectedTags.includes(`-${tag}`),
      },
    ])
  );
  const [isMinus, setIsMinus] = React.useState(false);
  const onChangeCurried = React.useCallback(
    (tag: string) => (checked: boolean) => {
      if (checked) {
        onChange([...selectedTags, isMinus ? `-${tag}` : tag]);
      }
      if (!checked) {
        onChange(
          selectedTags.filter(
            (selectedTag) => selectedTag !== tag && selectedTag !== `-${tag}`
          )
        );
      }
    },
    [onChange, selectedTags, isMinus]
  );

  return (
    <Accordion elevation={2} TransitionProps={{ unmountOnExit: true }} sx={sx}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
          <Typography component="p" variant="h6" fontWeight="bold">
            {categoryLabel}
          </Typography>
          {selectedTags.map((selectedTag) => {
            const isMinusCheck = selectedTag.startsWith('-');
            return (
              <Chip
                key={selectedTag}
                label={selectedTag}
                variant="outlined"
                color={isMinusCheck ? 'error' : 'default'}
              />
            );
          })}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <LabelledSwitch
          label="マイナス検索に切り替える"
          checked={isMinus}
          onChange={setIsMinus}
          color="error"
        />
        <FormGroup row>
          {tags.map((tag) => {
            const onChange = onChangeCurried(tag);
            const { checked, minusChecked } = selectedTagMap.get(tag);
            return (
              <TagCheckBox
                key={tag}
                label={tag}
                checked={checked}
                minusChecked={minusChecked}
                onChange={onChange}
              />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
