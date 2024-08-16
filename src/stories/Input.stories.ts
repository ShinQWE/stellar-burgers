import { Input } from '../components/ui/ingredients-input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Input',
  component: Input,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPreloader: Story = {
  args: {
    value: 'Какой-нибудь текст',
    type: 'text',
    placeholder: 'Текст',
    onChange: () => {}
  }
};
