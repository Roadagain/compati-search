import {
  Autocomplete,
  Chip,
  SxProps,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { AutocompleteOption } from '../../lib/autocomplete';
import { SearchTarget } from '../../lib/search-target';
import { Tag } from '../../lib/tagged-character';

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
  autocompleteOptions: AutocompleteOption[];
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
  const placeholder = `${target === SearchTarget.TAG ? 'タグ' : '名前'}を入力`;
  const onChangeWords = React.useCallback(
    (_, values: (string | AutocompleteOption)[]) => {
      const words = values.map((value) => {
        return typeof value === 'string' ? value : value.label;
      });
      onChange(words);
    },
    [onChange]
  );
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Autocomplete
      autoComplete
      freeSolo
      multiple
      filterSelectedOptions
      value={words}
      onChange={onChangeWords}
      options={autocompleteOptions}
      groupBy={
        target === SearchTarget.TAG
          ? (option: Tag) => option.category
          : undefined
      }
      isOptionEqualToValue={(option: AutocompleteOption, value: string) =>
        option.label === value
      }
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          type="search"
          placeholder={placeholder}
          inputProps={{
            ...params.inputProps,
            sx: { fontSize: isTabletOrDesktop ? theme.typography.h5 : theme.typography.h6 },
          }}
        />
      )}
      renderTags={(values: string[], getTagProps) =>
        values.map((value, index) => (
          <Chip
            key={value}
            label={value}
            {...getTagProps({ index })}
            sx={{ fontSize: theme.typography.h6 }}
          />
        ))
      }
      sx={sx}
    />
  );
};
