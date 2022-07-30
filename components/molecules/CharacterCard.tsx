import { Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';
import { TaggedCharacter } from '../../lib/tagged-character';
import { TagBadge } from '../atoms/TagBadge';
import Stack from '@mui/material/Stack';

type Props = TaggedCharacter;

export const CharacterCard: React.FC<Props> = ({ name, tags }) => (
  <Card elevation={2}>
    <CardHeader title={name} />
    <CardContent sx={{ overflowX: 'scroll' }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}
      >
        {tags.map((tag) => (
          <TagBadge key={tag}>{tag}</TagBadge>
        ))}
      </Stack>
    </CardContent>
  </Card>
);
