import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SortOrder } from '../../lib/sort-characters';
import { SortOrderSelector } from './SortOrderSelector';

const componentMeta: ComponentMeta<typeof SortOrderSelector> = {
  title: 'Molecules/SortOrderSelector',
  component: SortOrderSelector,
  argTypes: {
    value: {
      options: Object.keys(SortOrder).filter((key) => isNaN(Number(key))),
      mapping: SortOrder,
      control: 'radio',
    },
    sx: { control: 'object' },
  },
};

export default componentMeta;

const Template: ComponentStory<typeof SortOrderSelector> = (args) => (
  <SortOrderSelector {...args} />
);

export const Selector = Template.bind({});
Selector.args = {
  value: SortOrder.ID,
  sx: {},
};
