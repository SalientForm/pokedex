export interface MenuItemConfig {
  label: string; // text on item
  icon?: string; // icon class name 'theme:name'
  config?: unknown; // config data for item
  action: string; // link | dispatch | query | custom
  shortcut?: string
}

export interface DefaultLayoutProps {
  appTitle: string;
  menuItems?: MenuItemConfig[];
  recentLinks?: MenuItemConfig[];
  links?: MenuItemConfig[];
}
