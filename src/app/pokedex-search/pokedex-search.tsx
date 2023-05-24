import { useEffect, useState } from 'react';
import { fetchAllPokemonIndex } from '../state/pokemon-index/pokemon-index.slice';
import styles from './pokedex-search.module.scss';
import PokedexSearchForm from './pokedex-search-form/pokedex-search-form';
import { useDispatch } from 'react-redux';
import { PokedexDispatch } from '../state/root-store';
import PokedexSearchResult from './search-result/pokedex-search-result';
import PokedexViewHistory from '../pokedex-view-history/pokedex-view-history';
import PokemonDetail from '../pokemon-detail/pokemon-detail';

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
    <div className={styles['container']}>
      <PokedexSearchForm handlePokemonSearch={handlePokemonSearch} />
      <div className={'d-flex flex-row'}>
        <div className={'flex-grow-1'}>
          <PokedexSearchResult searchText={searchText}></PokedexSearchResult>
        </div>
        <div className={'ms-3 flex-shrink-0'}>
          <PokemonDetail></PokemonDetail>
          <PokedexViewHistory></PokedexViewHistory>
        </div>
      </div>
    </div>
  );
}

export default PokedexSearch;
