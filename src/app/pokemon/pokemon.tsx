import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonProvider } from './state/pokemon/pokemon-provider';
import { pokemonIndexActions, selectSelectedPokemonId } from '../pokedex/state/pokemon-index/pokemon-index.slice';
import {
  addPokemonViewHistoryItemByPokemonId,
  PokemonViewHistoryEntity,
} from '../pokedex/state/pokemon-view-history/pokemon-view-history.slice';
import PokedexViewHistory from '../pokedex/view-history/pokedex-view-history';
import { PokedexDispatch } from '../state/root-store';
import PokemonDetail from './detail/pokemon-detail';
import styles from './pokemon.module.scss';
import { useNavigate, useParams } from 'react-router';
import {
  unstable_useBlocker as useBlocker,
  unstable_Blocker as Blocker,
  unstable_BlockerFunction as BlockerFunction,
} from 'react-router';

/* eslint-disable-next-line */
export interface PokemonProps {}

/**
 * TODO: change from pokemon to pokemon-detail feature
 *
 * @param props
 * @constructor
 */

export function Pokemon(props: PokemonProps) {
  const { id: pokemonIdUrlParam } = useParams();
  const selectedPokemonId = useSelector(selectSelectedPokemonId);
  // param value is priority
  const pokemonId = pokemonIdUrlParam ? parseInt(pokemonIdUrlParam) : selectedPokemonId ?? 1;
  const dispatch = useDispatch<PokedexDispatch>();
  const navigate = useNavigate();

  const [exitTimeoutId, setExitTimeoutId] = useState<NodeJS.Timeout | undefined>();

  const blocker = useBlocker(true);

  const startTimeout = useCallback(() => {
    if (exitTimeoutId) {
      clearTimeout(exitTimeoutId);
    }
    const timeoutId = setTimeout(() => {
      if (blocker.proceed) {
        blocker.proceed();
      }

      if (blocker.reset) {
        blocker.reset();
      }
    }, 3000);
    setExitTimeoutId(timeoutId);
  }, [blocker, exitTimeoutId]);

  useEffect(() => {
    console.log('-------------');
    console.log('state', blocker.state);
    console.log('proceed', blocker.proceed);
    console.log('reset', blocker.reset);
    console.log('location', blocker.location);
    startTimeout();
  }, [blocker]);

  useEffect(() => {
    dispatch(pokemonIndexActions.setSelectedPokemon(pokemonId));
    dispatch(addPokemonViewHistoryItemByPokemonId(pokemonId));
    if (!pokemonIdUrlParam) {
      navigate(`/pokemon/detail/${pokemonId}`, { replace: true });
    }
    return () => {
      return;
    };
  }, [pokemonIdUrlParam, navigate, pokemonId, dispatch]);

  const onClickViewHistoryItem = (viewHistoryItem: PokemonViewHistoryEntity) => {
    navigate(`/pokemon/detail/${viewHistoryItem.pokemonId}`);
  };

  return (
    <div className={styles['container']}>
      <PokemonProvider pokemonId={pokemonId}>
        <PokemonDetail></PokemonDetail>
      </PokemonProvider>
      <div className='flex-grow-0 d-flex flex-column'>
        <PokedexViewHistory onClickViewHistoryItem={onClickViewHistoryItem}></PokedexViewHistory>
      </div>
    </div>
  );
}

export default Pokemon;
