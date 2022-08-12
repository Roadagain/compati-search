import React, { FormEventHandler } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { SearchTargetSelect } from './SearchTargetSelect';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { SearchTarget } from '../../lib/search-target';

interface Props {
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
   * 検索対象
   */
  target: SearchTarget;
  /**
   * 検索対象の変更ハンドラ
   * @param target - 変更後の検索対象
   */
  onChangeTarget: (target: SearchTarget) => void;
  /**
   * 検索ワードの補完候補
   */
  options: string[];
  /**
   * 検索イベントのハンドラー
   * @param text - 検索文字列
   */
  onSearch: (texts: string[], target: SearchTarget) => void;
}

export const SearchForm: React.FC<Props> = ({
  texts,
  onChangeTexts,
  target,
  onChangeTarget,
  options,
  onSearch,
}) => {
  const onTextChange = (_, texts: string[]) => onChangeTexts(texts);
  const startSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (texts.length > 0) {
      onSearch(texts, target);
    }
  };
  const theme = useTheme();
  const placeholder = `${target === SearchTarget.TAG ? 'タグ' : '名前'}を入力`;

  return (
    <Box
      component="form"
      onSubmit={startSearch}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <SearchTargetSelect target={target} onChange={onChangeTarget} />
      <Autocomplete
        autoComplete
        multiple
        filterSelectedOptions
        value={texts}
        onChange={onTextChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore optionsの要求型が明らかにおかしいから一時的にignoreする
        options={options}
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
        sx={{ ml: 2 }}
      />
      <IconButton type="submit" sx={{ ml: 1 }}>
        <SearchIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};
