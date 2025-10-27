export interface MenuItem {
  id: string;
  label: string;
  path?: string;
}

export interface MenuSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: MenuItem[];
  defaultExpanded?: boolean;
}

export interface ExpandedItems {
  [key: string]: boolean;
}
