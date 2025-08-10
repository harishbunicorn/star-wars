import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Card from '@/components/ui/Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hover: {
      control: 'boolean',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">This is a basic card component with some content inside.</p>
      </div>
    ),
  },
};

export const WithHover: Story = {
  args: {
    hover: true,
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Hoverable Card</h3>
        <p className="text-gray-600">This card has hover effects enabled.</p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    hover: true,
    onClick: fn(),
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
        <p className="text-gray-600">Click this card to trigger an action.</p>
      </div>
    ),
  },
};

export const MovieCard: Story = {
  args: {
    hover: true,
    onClick: fn(),
    children: (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="bg-yellow-400 text-black px-2 py-1 rounded font-mono font-bold">IV</span>
          <h3 className="text-xl font-bold">A New Hope</h3>
        </div>
        <p className="text-gray-600 mb-2">Directed by George Lucas</p>
        <p className="text-sm text-gray-500">Released: May 25, 1977</p>
      </div>
    ),
  },
};