import { render } from '@testing-library/react';

import Pokedex from './pokedex';

describe('Pokedex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pokedex />);
    expect(baseElement).toBeTruthy();
  });
});
