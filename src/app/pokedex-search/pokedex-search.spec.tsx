import { fireEvent, render, screen } from '@testing-library/react';
import * as module from 'module';
import { Provider } from 'react-redux';
import * as pokemonIndexSlice from '../state/pokemon-index/pokemon-index.slice';
import { PokedexDispatch, rootStore } from '../state/root-store';
import PokedexSearch from './pokedex-search';
import { PokedexSearchResultProps } from './search-result/pokedex-search-result';

vi.mock('../state/pokemon-index/pokemon-index.slice', async () => {
  const actual = (await vi.importActual('../state/pokemon-index/pokemon-index.slice')) as module;
  return {
    ...actual,
    fetchAllPokemonIndex: () => ({
      type: 'pokemonIndex/fetchStatus',
    }),
  };
});

vi.mock('./search-result/pokedex-search-result', () => ({
  default: (props: PokedexSearchResultProps) => <div data-testid='pokedexSearchResult'>{props.searchText}</div>,
}));

describe('PokedexSearch', () => {
  it('should render and dispatch fetchAllPokemonIndex successfully', () => {
    rootStore.dispatch = vi.fn() as PokedexDispatch;
    render(
      <Provider store={rootStore}>
        <PokedexSearch />
      </Provider>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(rootStore.dispatch).toHaveBeenCalledTimes(1);
    expect(rootStore.dispatch).toHaveBeenCalledWith(pokemonIndexSlice.fetchAllPokemonIndex());
  });

  it('updates search text when a new value is inputted', () => {
    render(
      <Provider store={rootStore}>
        <PokedexSearch />
      </Provider>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'bulb' },
    });
    expect(screen.getByTestId('pokedexSearchResult').textContent).toEqual('bulb');
  });
});
