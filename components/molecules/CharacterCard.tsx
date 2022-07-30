import { Card, CardHeader } from '@mui/material';
import React from 'react';
import { TaggedCharacter } from '../../lib/tagged-character';

type Props = TaggedCharacter;

export const CharacterCard: React.FC<Props> = ({ name }) => (
  <Card elevation={2}>
    <CardHeader title={name} />
  </Card>
)
