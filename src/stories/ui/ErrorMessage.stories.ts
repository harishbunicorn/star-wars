import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ErrorMessage from '@/components/ui/ErrorMessage';

const meta = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Something went wrong while loading the data.',
  },
};

export const WithRetry: Story = {
  args: {
    message: 'Failed to load Star Wars movies. Please try again.',
    onRetry: fn(),
  },
};

export const NetworkError: Story = {
  args: {
    message: 'Network error - please check your internet connection and try again.',
  },
};

export const ServerError: Story = {
  args: {
    message: 'Server error - the Star Wars API is currently unavailable. Please try again later.',
  },
};

export const LongMessage: Story = {
  args: {
    message: 'An unexpected error occurred while trying to fetch data from the Star Wars API. This could be due to network connectivity issues, server problems, or other technical difficulties. Please check your internet connection and try again.',
  },
};