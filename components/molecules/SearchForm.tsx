import React, { ChangeEventHandler, FormEventHandler } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { SearchTarget, SearchTargetSelect } from './SearchTargetSelect';

interface Props {
  /**
   * 検索イベントのハンドラー
   * @param text - 検索文字列
   */
  onSearch: (text: string, target: SearchTarget) => void;
}

export const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [text, setText] = React.useState('');
  const [target, setTarget] = React.useState(SearchTarget.TAG);
  const onTextChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setText(event.target.value);
  const startSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (text) {
      onSearch(text, target);
    }
  };
  const theme = useTheme();
  const placeholder = `${
    target === SearchTarget.TAG ? 'タグ' : 'キャラクター'
  }名を入力`;

  return (
    <Box
      component="form"
      onSubmit={startSearch}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <SearchTargetSelect target={target} onChange={setTarget} />
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
        sx={{ fontSize: theme.typography.h5, ml: 2 }}
      />
    </Box>
  );
};
