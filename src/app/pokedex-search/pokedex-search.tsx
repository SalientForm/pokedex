import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchAllPokemonIndex } from '../state/index/pokemon-index.slice';
import { PokedexDispatch } from '../state/root-store';
import PokedexSearchForm from './pokedex-search-form/pokedex-search-form';
import styles from './pokedex-search.module.scss';
import PokedexSearchResult from './search-result/pokedex-search-result';

export function PokedexSearch() {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch<PokedexDispatch>();

  // load all pokemon since PokeApi v2 does not support fuzzy search
  useEffect(() => {
    dispatch(fetchAllPokemonIndex());
  }, [dispatch]);

  const handlePokemonSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <Card className={styles['container']}>
      <PokedexSearchForm handlePokemonSearch={handlePokemonSearch} />
      <PokedexSearchResult searchText={searchText}></PokedexSearchResult>
    </Card>
  );
}

export default PokedexSearch;
