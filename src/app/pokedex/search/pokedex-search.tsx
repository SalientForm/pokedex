import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchAllPokemonIndex } from '../state/pokemon-index/pokemon-index.slice';
import { PokedexDispatch } from '../../state/root-store';
import PokedexSearchForm from './form/pokedex-search-form';
import styles from './pokedex-search.module.scss';
import PokedexSearchResult from './result/pokedex-search-result';

export function PokedexSearch() {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch<PokedexDispatch>();

  // load all pokemon since PokeApi v2 does not support fuzzy search
  useEffect(() => {
    dispatch(fetchAllPokemonIndex());
  }, [dispatch]);

  const handlePokemonSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <Card className={styles['container']}>
      <div className={styles['title']}>Search</div>
      <PokedexSearchForm handlePokemonSearch={handlePokemonSearchTextChange} />
      <PokedexSearchResult searchText={searchText}></PokedexSearchResult>
    </Card>
  );
}

export default PokedexSearch;
