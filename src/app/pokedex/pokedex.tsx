import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { PokemonProvider } from '../pokemon/state/pokemon/pokemon-provider';
import PokemonSummaryCard from '../pokemon/summary-card/pokemon-summary-card';
import styles from './pokedex.module.scss';
import PokedexSearch from './search/pokedex-search';
import { pokemonIndexActions, selectSelectedPokemonId } from './state/pokemon-index/pokemon-index.slice';
import {
  addPokemonViewHistoryItemByPokemonId,
  PokemonViewHistoryEntity
} from './state/pokemon-view-history/pokemon-view-history.slice';
import PokedexViewHistory from './view-history/pokedex-view-history';

export function Pokedex() {
  const pokemonId$ = useSelector(selectSelectedPokemonId);

  const navigate = useNavigate();
  const onSelectHistoryItem = (viewHistoryItem: PokemonViewHistoryEntity) => {
    onSelectPokemon(viewHistoryItem.pokemonId);
  };

  const onSelectPokemon = (pokemonId: number) => {
    navigate(`/pokemon/detail/${pokemonId}`);
  };

  return (
    <div className={styles['container']}>
      <div className={'flex-grow-1'}>
        <PokedexSearch />
      </div>
      <div className={'ms-3 flex-shrink-0'}>
        <PokemonProvider pokemonId={pokemonId$}>
          <PokemonSummaryCard onClick={onSelectPokemon} className={'mb-2'} title={'Last viewed'} />
        </PokemonProvider>
        <PokedexViewHistory onClickViewHistoryItem={onSelectHistoryItem} />
      </div>
    </div>
  );
}

export default Pokedex;
