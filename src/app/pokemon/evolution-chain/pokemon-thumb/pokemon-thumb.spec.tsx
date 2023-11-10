import { render } from '@testing-library/react';

import PokemonThumb from './pokemon-thumb';

describe('PokemonThumb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonThumb />);
    expect(baseElement).toBeTruthy();
  });
});
