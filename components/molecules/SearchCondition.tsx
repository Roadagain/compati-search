import { Typography } from '@mui/material';
import React from 'react';
import { SearchTarget } from './SearchTargetSelect';

interface Props {
  target: SearchTarget;
  text: string;
}

export const SearchCondition: React.FC<Props> = ({ target, text }) => {
  const targetStr = target === SearchTarget.TAG ? 'タグ' : '名前';

  return (
    <Typography variant="h5">
      <Typography component="span" variant="h5" fontWeight="bold">
        {text}
      </Typography>
      の{targetStr}検索結果
    </Typography>
  );
};
