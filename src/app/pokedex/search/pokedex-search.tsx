import { useState } from 'react';
import { Card } from 'react-bootstrap';
import PokedexSearchForm from './form/pokedex-search-form';
import styles from './pokedex-search.module.scss';
import PokedexSearchResult from './result/pokedex-search-result';

export function PokedexSearch() {
  const [searchText, setSearchText] = useState('');

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
