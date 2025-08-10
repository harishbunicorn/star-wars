import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Table from '@/components/ui/Table';

interface SampleData {
  id: number;
  name: string;
  role: string;
  status: string;
  joinDate: string;
}

const sampleData: SampleData[] = [
  { id: 1, name: 'Luke Skywalker', role: 'Jedi Knight', status: 'Active', joinDate: '1977-05-25' },
  { id: 2, name: 'Princess Leia', role: 'Rebel Leader', status: 'Active', joinDate: '1977-05-25' },
  { id: 3, name: 'Han Solo', role: 'Smuggler', status: 'Active', joinDate: '1977-05-25' },
  { id: 4, name: 'Darth Vader', role: 'Sith Lord', status: 'Deceased', joinDate: '1977-05-25' },
];

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onSort: fn(),
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      { key: 'status', header: 'Status', sortable: false },
      { key: 'joinDate', header: 'Join Date', sortable: true },
    ],
  },
};

export const WithCustomRender: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { 
        key: 'role', 
        header: 'Role', 
        sortable: true,
        render: (item) => (
          <span className={`px-2 py-1 rounded text-sm ${
            item.role === 'Jedi Knight' ? 'bg-blue-100 text-blue-800' :
            item.role === 'Sith Lord' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {item.role}
          </span>
        )
      },
      { 
        key: 'status', 
        header: 'Status', 
        sortable: false,
        render: (item) => (
          <span className={`px-2 py-1 rounded text-sm ${
            item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {item.status}
          </span>
        )
      },
      { key: 'joinDate', header: 'Join Date', sortable: true },
    ],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      { key: 'status', header: 'Status', sortable: false },
    ],
    emptyMessage: 'No characters found in the galaxy...',
  },
};

export const WithSorting: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      { key: 'status', header: 'Status', sortable: false },
      { key: 'joinDate', header: 'Join Date', sortable: true },
    ],
    sortField: 'name',
    sortOrder: 'asc',
  },
};