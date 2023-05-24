import PokedexSearch from '../pokedex-search/pokedex-search';
import PokedexViewHistory from '../pokedex-view-history/pokedex-view-history';
import PokemonDetail from '../pokemon-detail/pokemon-detail';
import styles from './pokedex.module.scss';

export function Pokedex() {
  return (
    <div className={styles['container']}>
      <div className={'flex-grow-1'}>
        <PokedexSearch />
      </div>
      <div className={'ms-3 flex-shrink-0'}>
        <PokemonDetail />
        <PokedexViewHistory />
      </div>
    </div>
  );
}

export default Pokedex;
