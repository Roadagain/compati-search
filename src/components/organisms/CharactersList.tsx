import { Grid, SxProps, Theme } from '@mui/material';
import React from 'react';
import { TaggedCharacter } from '../../lib/tagged-character';
import { CharacterCard } from '../molecules/CharacterCard';

interface Props {
  /**
   * キャラクター一覧
   */
  characters: TaggedCharacter[];
  /**
   * タグクリックのハンドラ
   * @param tagLabel - クリックされたタグ
   */
  onClickTag: (tagLabel: string) => void;
  /**
   * テーマ関連のスタイル指定
   */
  sx: SxProps<Theme>;
}

export const CharactersList: React.FC<Props> = ({
  characters,
  onClickTag,
  sx,
}) => (
  <Grid container spacing={2} sx={sx}>
    {characters.map(({ name, tags }) => (
      <Grid item key={name} xs={12} sm={6} md={4}>
        <CharacterCard
          name={name}
          tagLabels={tags.map(({ label }) => label)}
          onClickTag={onClickTag}
        />
      </Grid>
    ))}
  </Grid>
);
