import React, { ChangeEventHandler, FormEventHandler } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

export enum SearchTarget {
  TAG,
  NAME,
}

interface Props {
  /**
   * 検索イベントのハンドラー
   * @param text - 検索文字列
   */
  onSearch: (text: string) => void;
  /**
   * 検索対象 (タグ or 名前)
   */
  target: SearchTarget
}

export const SearchForm: React.FC<Props> = ({ onSearch, target }) => {
  const [text, setText] = React.useState('');
  const onTextChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setText(event.target.value);
  const startSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (text) {
      onSearch(text);
    }
  };
  const theme = useTheme();
  const placeholder = `${target === SearchTarget.TAG ? 'タグ' : 'キャラクター'}名を入力`;

  return (
    <Box component="form" onSubmit={startSearch}>
      <OutlinedInput
        type="search"
        placeholder={placeholder}
        value={text}
        onChange={onTextChange}
        endAdornment={
          <IconButton type="submit">
            <SearchIcon fontSize="large" />
          </IconButton>
        }
        fullWidth
        sx={{ fontSize: theme.typography.h5 }}
      />
    </Box>
  );
};
