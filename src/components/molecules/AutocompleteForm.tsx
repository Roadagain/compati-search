import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React from 'react';

import { isOptionEqualToWord } from '../../lib/autocomplete';
import { SearchTarget, SearchType } from '../../lib/search-target';

interface Props {
  /**
   * 検索対象
   */
  target: SearchTarget;
  /**
   * 検索ワード
   */
  words: string[];
  /**
   * 補完候補
   */
  autocompleteOptions: string[];
  /**
   * ワード変更ハンドラ
   * @param words - 変更後のワード
   */
  onChange: (words: string[]) => void;
  /**
   * テーマ関連のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const AutocompleteForm: React.FC<Props> = ({
  target,
  words,
  autocompleteOptions,
  onChange,
  sx,
}) => {
  const placeholder = `${
    target.type === SearchType.NAME ? '名前' : target.category
  }を入力`;
  const onChangeWords = React.useCallback(
    (_, words: string[]) => {
      onChange(words);
    },
    [onChange]
  );
  const [isMinus, setIsMinus] = React.useState(false);
  const onInputChange = React.useCallback(
    (_, value: string) => {
      setIsMinus(value.startsWith('-'));
    },
    [setIsMinus]
  );
  const options = isMinus
    ? autocompleteOptions.map((option) => `-${option}`)
    : autocompleteOptions;
  const theme = useTheme();

  return (
    <Autocomplete
      autoComplete
      freeSolo
      multiple
      filterSelectedOptions
      value={words}
      onInputChange={onInputChange}
      onChange={onChangeWords}
      options={options}
      isOptionEqualToValue={isOptionEqualToWord}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          type="search"
          placeholder={placeholder}
          inputProps={{
            ...params.inputProps,
            sx: {
              fontSize: theme.typography.h6,
            },
          }}
        />
      )}
      renderTags={(values: string[], getTagProps) =>
        values.map((value, index) => {
          const color = value.startsWith('-') ? 'error' : 'default';
          return (
            <Chip
              key={value}
              label={value}
              color={color}
              {...getTagProps({ index })}
              sx={{ fontSize: theme.typography.h6 }}
            />
          );
        })
      }
      sx={sx}
    />
  );
};
