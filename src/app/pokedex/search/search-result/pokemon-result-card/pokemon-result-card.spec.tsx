import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from "../../../../state/root-store";

import PokemonResultCard, { PokemonCardSummaryProps } from './pokemon-result-card';

const mockProps: PokemonCardSummaryProps = {
  pokemonId: 1,
  pokemonName: 'Pokemon-Name',
  className: 'm-3',
};

describe('PokemonCardSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokemonResultCard {...mockProps} />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
