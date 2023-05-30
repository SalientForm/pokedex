import { render } from '@testing-library/react';
import module from "module";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import * as pokemonIndexSlice from "./pokedex/state/pokemon-index/pokemon-index.slice";
import { PokedexDispatch, rootStore } from './state/root-store';

vi.mock('./pokedex/state/pokemon-index/pokemon-index.slice', async () => {
  const actual = (await vi.importActual('./pokedex/state/pokemon-index/pokemon-index.slice')) as module;
  return {
    ...actual,
    fetchAllPokemonIndex: () => ({
      type: 'pokemonIndex/fetchStatus',
    }),
  };
});

const defaultRender = () =>
  render(
    <Provider store={rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = defaultRender();
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = defaultRender();
    expect(getByText(/Pokédex/i)).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    rootStore.dispatch = vi.fn() as PokedexDispatch;
    defaultRender();
    expect(rootStore.dispatch).toHaveBeenCalledTimes(1);
    expect(rootStore.dispatch).toHaveBeenCalledWith(pokemonIndexSlice.fetchAllPokemonIndex());
  });
});
