import { render } from '@testing-library/react';

import PokedexSearch from './pokedex-search';

describe('PokedexSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokedexSearch />);
    expect(baseElement).toBeTruthy();
  });
});
