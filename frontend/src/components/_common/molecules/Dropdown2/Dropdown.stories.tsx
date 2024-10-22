import type { Meta, StoryObj } from '@storybook/react';
import DropdownItemRenderer from '@components/_common/molecules/DropdownItemRenderer';
import type { DropdownItemType } from '@components/_common/molecules/DropdownItemRenderer';
import Dropdown, { DropdownBaseProps } from '.';

export default {
  component: Dropdown,
  title: 'Common/Molecules/Dropdown2',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown 컴포넌트는 선택 가능한 옵션 목록을 표시합니다. DropdownItemRenderer을 사용하여 중첩된 메뉴 구조를 지원합니다.',
      },
    },
  },
  argTypes: {
    initValue: { control: 'text' },
    width: { control: 'number' },
    size: { control: { type: 'radio', options: ['sm', 'md'] } },
    isShadow: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    value: 'Dropdown에 들어갈 string',
  },
} as Meta<DropdownBaseProps>;

const Template: StoryObj<DropdownBaseProps> = {
  render: (args) => <Dropdown {...args} />,
};

const createSampleItems: DropdownItemType[] = [
  {
    id: 1,
    name: 'Option 1',
    type: 'clickable',
    onClick: ({ targetProcessId }) => alert(`Clicked Option 1, processId: ${targetProcessId}`),
  },
  {
    id: 2,
    name: 'Option 2',
    type: 'clickable',
    onClick: ({ targetProcessId }) => alert(`Clicked Option 2, processId: ${targetProcessId}`),
  },
  {
    id: 3,
    name: 'Submenu',
    type: 'subTrigger',
    items: [
      {
        id: 4,
        name: 'Suboption 1',
        type: 'clickable',
        onClick: ({ targetProcessId }) => alert(`Clicked Suboption 1, processId: ${targetProcessId}`),
      },
      {
        id: 5,
        name: 'Suboption 2',
        type: 'clickable',
        onClick: ({ targetProcessId }) => alert(`Clicked Suboption 2, processId: ${targetProcessId}`),
      },
    ],
  },
];

export const Default: StoryObj<DropdownBaseProps> = {
  ...Template,
  args: {
    size: 'md',
    children: (
      <DropdownItemRenderer
        items={createSampleItems}
        size="md"
      />
    ),
  },
};

export const SmallSize: StoryObj<DropdownBaseProps> = {
  ...Template,
  args: {
    size: 'sm',
    children: (
      <DropdownItemRenderer
        items={createSampleItems}
        size="sm"
      />
    ),
  },
};

export const WithInitValue: StoryObj<DropdownBaseProps> = {
  ...Template,
  args: {
    size: 'md',
    value: '선택된 옵션',
    children: (
      <DropdownItemRenderer
        items={createSampleItems}
        size="md"
      />
    ),
  },
};

export const WithSeparator: StoryObj<DropdownBaseProps> = {
  ...Template,
  args: {
    size: 'sm',
    children: (
      <DropdownItemRenderer
        items={[
          ...createSampleItems,
          {
            id: 6,
            name: 'Separated Option',
            type: 'clickable',
            onClick: ({ targetProcessId }) => alert(`Clicked Separated Option, processId: ${targetProcessId}`),
            hasSeparate: true,
          },
        ]}
        size="sm"
      />
    ),
  },
};

export const Disabled: StoryObj<DropdownBaseProps> = {
  ...Template,
  args: {
    size: 'md',
    disabled: true,
    children: (
      <DropdownItemRenderer
        items={createSampleItems}
        size="md"
      />
    ),
  },
};

export const CustomWidth: StoryObj<DropdownBaseProps> = {
  ...Template,
  args: {
    size: 'md',
    width: 300,
    children: (
      <DropdownItemRenderer
        items={createSampleItems}
        size="md"
      />
    ),
  },
};

export const WithoutShadow: StoryObj<DropdownBaseProps> = {
  ...Template,
  args: {
    size: 'md',
    isShadow: false,
    children: (
      <DropdownItemRenderer
        items={createSampleItems}
        size="md"
      />
    ),
  },
};
