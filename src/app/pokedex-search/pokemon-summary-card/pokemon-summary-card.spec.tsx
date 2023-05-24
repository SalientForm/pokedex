import { render } from '@testing-library/react';

import PokemonSummaryCard, {
  PokemonCardSummaryProps,
} from './pokemon-summary-card';

const mockProps: PokemonCardSummaryProps = {
  pokemonId: 1,
  pokemonName: 'Pokemon-Name',
  className: 'm-3',
};

describe('PokemonCardSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonSummaryCard {...mockProps} />);
    expect(baseElement).toBeTruthy();
  });
});
