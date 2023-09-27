import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';
import { fetchAllPokemonIndex, selectPokemonIndexItemById } from './pokedex/state/pokemon-index/pokemon-index.slice';
import { PokedexDispatch } from './state/root-store';
import { AnimatePresence } from 'framer-motion';
import { pokedexRouter } from './routing/root-router-config';

export function App() {
  // TODO: create initialization hook that won't render until index is available
  const dispatch = useDispatch<PokedexDispatch>();
  const indexCheck = useSelector(selectPokemonIndexItemById(1));
  // load all pokemon since PokeApi v2 does not support fuzzy search
  useEffect(() => {
    dispatch(fetchAllPokemonIndex());
  }, [dispatch]);

  if (!indexCheck) {
    return null;
  }

  return (
    <AnimatePresence mode='wait'>
      <RouterProvider router={pokedexRouter} />
    </AnimatePresence>
  );
}

export default App;
