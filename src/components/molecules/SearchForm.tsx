import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { SearchTargetSelect } from './SearchTargetSelect';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, TextField } from '@mui/material';
import { SearchTarget } from '../../lib/search-target';
import { Tag } from '../../lib/tagged-character';

interface Props {
  /**
   * 検索対象
   */
  target: SearchTarget;
  /**
   * 検索対象の変更ハンドラ
   * @param target - 変更後の検索対象
   */
  onChangeTarget: (target: SearchTarget) => void;
  /**
   * 検索文字列
   */
  texts: string[];
  /**
   * 検索文字列の変更ハンドラ
   * @param texts - 変更後の検索文字列
   */
  onChangeTexts: (texts: string[]) => void;
  /**
   * 検索ワードの補完候補
   */
  autocompleteOptions: Tag[] | string[];
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchForm: React.FC<Props> = ({
  target,
  onChangeTarget,
  texts,
  onChangeTexts,
  autocompleteOptions,
  sx,
}) => {
  const onTextChange = (_, texts: (string | Tag)[]) => {
    onChangeTexts(texts.map((text) => typeof text === 'string' ? text : text.label));
  }
  const theme = useTheme();
  const placeholder = `${target === SearchTarget.TAG ? 'タグ' : '名前'}を入力`;

  return (
    <Box component="form" sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <SearchTargetSelect target={target} onChange={onChangeTarget} />
      <Autocomplete
        autoComplete
        freeSolo
        multiple
        filterSelectedOptions
        value={texts}
        onChange={onTextChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore optionsの要求型が明らかにおかしいから一時的にignoreする
        options={autocompleteOptions}
        groupBy={
          target === SearchTarget.TAG
            ? (option: Tag) => option.category
            : undefined
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore valueの要求型が明らかにおかしいから一時的にignoreする
        isOptionEqualToValue={
          target === SearchTarget.TAG
            ? (option: Tag, value: string) => option.label === value
            : undefined
        }
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            placeholder={placeholder}
            inputProps={{
              ...params.inputProps,
              sx: { fontSize: theme.typography.h5 },
            }}
          />
        )}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore valueの要求型が明らかにおかしいから一時的にignoreする
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              key={option}
              label={option}
              {...getTagProps({ index })}
              sx={{ fontSize: theme.typography.h6 }}
            />
          ))
        }
        sx={{ ml: 2 }}
      />
    </Box>
  );
};
