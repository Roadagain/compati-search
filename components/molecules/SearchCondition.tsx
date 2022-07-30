import { Typography } from '@mui/material';
import React from 'react';
import { SearchTarget } from './SearchTargetSelect';

interface Props {
  target: SearchTarget;
  text: string;
}

export const SearchCondition: React.FC<Props> = ({ target, text }) => {
  const targetStr = target === SearchTarget.TAG ? "タグ": "名前";

  return (
    <Typography>
      {text}の{targetStr}検索結果
    </Typography>
  );
}
