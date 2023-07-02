import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { defaultLayoutConfig } from './config/default-layout.config';
import DefaultLayout from './layout/default-layout';
import { fetchAllPokemonIndex, selectPokemonIndexItemById } from './pokedex/state/pokemon-index/pokemon-index.slice';
import { PokedexDispatch } from './state/root-store';

export function App() {
  // TODO: create initialization hook that won't render until index is available
  const dispatch = useDispatch<PokedexDispatch>();
  const indexCheck = useSelector(selectPokemonIndexItemById(1));
  // load all pokemon since PokeApi v2 does not support fuzzy search
  useEffect(() => {
    dispatch(fetchAllPokemonIndex());
  }, [dispatch]);

  if(!indexCheck){
    return null;
  }

  return (
    <DefaultLayout layoutProps={defaultLayoutConfig}>
      <Outlet />
    </DefaultLayout>
  );
}

export default App;
