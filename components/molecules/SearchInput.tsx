import React, { ChangeEventHandler, FormEventHandler } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onSearch: (text: string) => void;
}

export const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const [text, setText] = React.useState('');
  const onTextChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setText(event.target.value);
  const startSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={startSearch}>
      <OutlinedInput
        type="search"
        placeholder="けんさく"
        value={text}
        onChange={onTextChange}
        endAdornment={
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        }
      />
    </form>
  );
};
