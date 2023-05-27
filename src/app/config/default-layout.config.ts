import { DefaultLayoutProps } from '../layout/default-layout.model';

export const defaultLayoutConfig: DefaultLayoutProps = {
  appTitle: 'Pokédex',
  menuItems: [
    // {
    //   label: 'About this Pokédex',
    //   action: 'dispatch',
    //   config: { action: 'showAboutPokedexDialog', payload: undefined },
    //   icon: 'add',
    // },
  ],
  links: [
    { label: 'Search', action: 'link', config: '/pokedex/search' },
    { label: 'Detail', action: 'link', config: '/pokemon/detail' },
  ],
};
