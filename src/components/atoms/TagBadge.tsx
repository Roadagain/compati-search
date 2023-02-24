import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

interface Props {
  /**
   * タグ
   */
  tag: string;
  /**
   * クリック時の挙動
   * @param tag - クリックされたタグ
   */
  onClick: (tag: string) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const TagBadge: React.FC<Props> = ({ tag, onClick, sx }) => {
  const onClickButton = React.useCallback(
    (e: React.MouseEvent) => {
      // organisms/ShipCard のアコーディオンが反応しないよう伝播を止める
      e.stopPropagation();
      onClick(tag);
    },
    [onClick, tag]
  );
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={onClickButton}
      sx={{ textTransform: 'none', ...sx }}
    >
      {tag}
    </Button>
  );
};
