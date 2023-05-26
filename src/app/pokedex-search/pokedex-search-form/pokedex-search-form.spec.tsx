import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../../state/root-store';
import PokedexSearchForm, { PokedexSearchFormProps } from './pokedex-search-form';

const mockProps: PokedexSearchFormProps = {
  handlePokemonSearch: (searchText: string) => {
    return undefined;
  },
};

describe('PokedexSearchForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokedexSearchForm handlePokemonSearch={mockProps.handlePokemonSearch} />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
