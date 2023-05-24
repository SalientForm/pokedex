import PokedexSearch from '../pokedex-search/pokedex-search';
import PokedexSearchResult from '../pokedex-search/search-result/pokedex-search-result';
import PokedexViewHistory from '../pokedex-view-history/pokedex-view-history';
import PokemonDetail from '../pokemon-detail/pokemon-detail';
import styles from './pokedex.module.scss';

/* eslint-disable-next-line */
export interface PokedexProps {}

export function Pokedex(props: PokedexProps) {
  return (
    <div className={styles['container']}>
      <div className={'flex-grow-1'}>
        <PokedexSearch />
      </div>
      <div className={'ms-3 flex-shrink-0'}>
        <PokemonDetail></PokemonDetail>
        <PokedexViewHistory></PokedexViewHistory>
      </div>
    </div>
  );
}

export default Pokedex;
