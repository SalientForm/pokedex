import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonProvider } from '../../../common/providers/pokemon-provider';
import { PokedexDispatch } from '../../../state/root-store';
import { addPokemonViewHistoryItemByPokemonId } from '../../state/pokemon-view-history/pokemon-view-history.slice';
import { pokemonIndexActions, selectPokemonFromIndexByName } from '../../state/pokemon-index/pokemon-index.slice';
import PokemonSummaryCard from '../../../pokemon/summary-card/pokemon-summary-card';
import styles from './pokedex-search-result.module.scss';

export interface PokedexSearchResultProps {
  searchText: string;
}

export function PokedexSearchResult(props: PokedexSearchResultProps) {
  const dispatch = useDispatch<PokedexDispatch>();
  const handleClickPokemonCard = (pokemonId: number) => {
    // TODO: move to redux-observable once redux-observable is implemented
    dispatch(pokemonIndexActions.setSelectedPokemon(pokemonId));
    dispatch(addPokemonViewHistoryItemByPokemonId(pokemonId));
  };
  const searchResults$ = useSelector(selectPokemonFromIndexByName(props.searchText));

  return (
    <Card className={styles['container']}>
      <div className={`${styles['title']}`}>Search Results</div>
      <div className={`${styles['results']}`}>
        {searchResults$.map((result) => (
          <PokemonProvider key={result.item.id} pokemonId={result.item.id}>
            <PokemonSummaryCard
              onClick={handleClickPokemonCard}
              className={'p-2 m-2'}
              rolloverEffect={true}
            ></PokemonSummaryCard>
          </PokemonProvider>
        ))}
        {searchResults$.length === 0 ? <div>(No results found.)</div> : null}
      </div>
    </Card>
  );
}

export default PokedexSearchResult;
