import React, { ChangeEventHandler, FormEventHandler } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  /**
   * 検索イベントのハンドラー
   * @param text - 検索文字列
   */
  onSearch: (text: string) => void;
}

export const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [text, setText] = React.useState('');
  const onTextChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setText(event.target.value);
  const startSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (text) {
      onSearch(text);
    }
  };

  return (
    <form onSubmit={startSearch}>
      <OutlinedInput
        type="search"
        placeholder="タグ名を入力"
        value={text}
        onChange={onTextChange}
        endAdornment={
          <IconButton type="submit">
            <SearchIcon fontSize="large" />
          </IconButton>
        }
        fullWidth
        sx={{ fontSize: 32 }}
      />
    </form>
  );
};
