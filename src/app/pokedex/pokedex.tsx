import { PokemonProvider } from '../common/providers/pokemon-provider';
import PokemonSummaryDetail from '../pokemon/summary-card/detail/pokemon-summary-detail';
import PokemonSummaryCard from '../pokemon/summary-card/pokemon-summary-card';
import PokedexSearch from './search/pokedex-search';
import PokedexViewHistory from './view-history/pokedex-view-history';
import styles from './pokedex.module.scss';

export function Pokedex() {
  return (
    <div className={styles['container']}>
      <div className={'flex-grow-1'}>
        <PokedexSearch />
      </div>
      <div className={'ms-3 flex-shrink-0'}>
        <PokemonProvider>
          <PokemonSummaryCard className={'mb-2'} title={'Last viewed'} />
        </PokemonProvider>
        <PokedexViewHistory />
      </div>
    </div>
  );
}

export default Pokedex;
