import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { AllSearchTargetLabels } from '../../lib/search-target';
import { Tag } from '../../lib/tag';
import { TagCategory } from '../../lib/tag-category';
import { LabelledSwitch } from './LabeledSwitch';
import { TagCheckBox } from './TagCheckBox';

type Props = {
  /**
   * タグの種類
   */
  category: TagCategory;
  /**
   * タグ一覧
   */
  tags: Tag[];
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
};

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
      tag.label,
      {
        checked: selectedTags.includes(tag.label),
        minusChecked: selectedTags.includes(`-${tag.label}`),
      },
    ])
  );
  const subCategorizedTagMap = tags.reduce((map, tag) => {
    const subCategory = tag.subCategory ?? '';
    const subCategoryTags = map.get(subCategory) ?? [];
    return map.set(subCategory, [...subCategoryTags, tag]);
  }, new Map<string, Tag[]>());

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
        <Stack
          direction="column"
          divider={<Divider flexItem />}
          spacing={1}
          mt={1}
        >
          {Array.from(subCategorizedTagMap.keys()).map((subCategory) => {
            const subCategorizedTags =
              subCategorizedTagMap.get(subCategory) ?? [];
            const checkboxes = subCategorizedTags.map(({ label }) => {
              const onChange = onChangeCurried(label);
              const { checked, minusChecked } = selectedTagMap.get(label);
              return (
                <TagCheckBox
                  key={label}
                  label={label}
                  checked={checked}
                  minusChecked={minusChecked}
                  onChange={onChange}
                />
              );
            });

            return (
              <React.Fragment key={subCategory}>
                {subCategory ? <Typography>{subCategory}</Typography> : null}
                <FormGroup row>{checkboxes}</FormGroup>
              </React.Fragment>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
