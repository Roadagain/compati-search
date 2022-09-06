import {
  Autocomplete,
  Chip,
  FilterOptionsState,
  SxProps,
  TextField,
  Theme,
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

const isOptionEqualToValue = (option: AutocompleteOption, value: string): boolean => {
  // マイナス検索しているラベルやマイナス検索中のプラスラベルを除外する
  const minusableWord = /-?(.*)/;
  const wordWithoutMinus = value.match(minusableWord)[1];
  const labelWithoutMinus = option.label.match(minusableWord)[1];
  return wordWithoutMinus === labelWithoutMinus;
}

const filterOptions = (
  options: AutocompleteOption[],
  state: FilterOptionsState<string>
): AutocompleteOption[] => {
  // マイナス検索しているラベルやマイナス検索中のプラスラベルを除外する
  const minusableWord = /-?(.*)/;
  const wordWithoutMinus = state.inputValue.match(minusableWord)[1];
  return options.filter((option) => {
    const labelWithoutMinus = option.label.match(minusableWord)[1];
    return labelWithoutMinus.includes(wordWithoutMinus)
  });
};

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
  const [isMinus, setIsMinus] = React.useState(false);
  const onInputChange = React.useCallback((_, value: string) => {
    setIsMinus(value.startsWith('-'))
  }, [setIsMinus])
  const options = isMinus ? autocompleteOptions.map((option) => ({
    ...option,
    label: `-${option.label}`
  })) : autocompleteOptions;
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
      groupBy={
        target === SearchTarget.TAG
          ? (option: Tag) => option.category
          : undefined
      }
      isOptionEqualToValue={isOptionEqualToValue}
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
          const color = value.startsWith('-') ? "error" : "default";
          return (<Chip
            key={value}
            label={value}
            color={color}
            {...getTagProps({ index })}
            sx={{ fontSize: theme.typography.h6 }}
          />)
        })
      }
      filterOptions={filterOptions}
      sx={sx}
    />
  );
};
