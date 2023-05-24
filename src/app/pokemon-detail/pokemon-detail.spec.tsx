import { render } from '@testing-library/react';

import PokemonDetail from './pokemon-detail';

describe('PokemonDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonDetail />);
    expect(baseElement).toBeTruthy();
  });
});
