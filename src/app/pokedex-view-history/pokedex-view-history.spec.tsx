import { render } from '@testing-library/react';

import PokedexViewHistory from './pokedex-view-history';

describe('PokedexViewHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokedexViewHistory />);
    expect(baseElement).toBeTruthy();
  });
});
