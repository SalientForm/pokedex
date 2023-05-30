import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { defaultLayoutConfig } from './config/default-layout.config';
import DefaultLayout from './layout/default-layout';
import { fetchAllPokemonIndex } from './pokedex/state/pokemon-index/pokemon-index.slice';
import { PokedexDispatch } from './state/root-store';

export function App() {
  const dispatch = useDispatch<PokedexDispatch>();

  // load all pokemon since PokeApi v2 does not support fuzzy search
  useEffect(() => {
    dispatch(fetchAllPokemonIndex());
  }, [dispatch]);

  return (
    <DefaultLayout layoutProps={defaultLayoutConfig}>
      <Outlet />
    </DefaultLayout>
  );
}

export default App;
