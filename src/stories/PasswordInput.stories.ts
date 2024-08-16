import { PasswordInput } from '../components/ui/password-input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/PasswordInput',
  component: PasswordInput,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPreloader: Story = {
  args: {
    password: '123456789',
    placeholder: 'Введите пароль',
    error: false,
    errorText: '',
    onChange: () => {},
    extraClass: ''
  }
};
