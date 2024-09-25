import { Branded } from './utilTypes';

export interface PopOverMenuItem {
  id: number;
  name: string;
  isHighlight?: boolean;
  onClick: ({ targetProcessId }: { targetProcessId: number }) => void;
}

export interface DropdownListItem {
  id: number;
  name: string;
  isHighlight?: boolean;
  onClick: ({ targetProcessId }: { targetProcessId: number }) => void;
  hasSeparate?: boolean;
}

export type ISO8601 = Branded<string, 'ISO8601'>;
