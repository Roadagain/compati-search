import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SampleButton } from '../../components/atoms/SampleButton';

const componentMeta: ComponentMeta<typeof SampleButton> = {
  title: 'Atoms/SampleButton',
  component: SampleButton,
  argTypes: {
    children: { control: 'text' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SampleButton> = (args) => (
  <SampleButton {...args} />
);

export const Button = Template.bind({});
Button.args = {
  children: 'ボタン',
};
