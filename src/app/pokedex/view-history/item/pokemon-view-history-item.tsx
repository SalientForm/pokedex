import styles from './pokemon-view-history-item.module.scss';
import {
  addPokemonViewHistoryItemByPokemonId,
  PokemonViewHistoryEntity,
} from '../../state/pokemon-view-history/pokemon-view-history.slice';
import { pokemonIndexActions } from '../../state/pokemon-index/pokemon-index.slice';
import { useDispatch } from 'react-redux';
import { PokedexDispatch } from '../../../state/root-store';

export interface ViewHistoryItemProps {
  viewHistoryItem: PokemonViewHistoryEntity;
}

const getTitle = (viewHistoryItem: PokemonViewHistoryEntity) =>
  `${viewHistoryItem.name} #${viewHistoryItem.pokemonId.toString().padStart(4, '0')}`;

export function PokemonViewHistoryItem(props: ViewHistoryItemProps) {
  const dispatch = useDispatch<PokedexDispatch>();
  const handleClickItem = () => {
    dispatch(pokemonIndexActions.setSelectedPokemon(props.viewHistoryItem.pokemonId));
    dispatch(addPokemonViewHistoryItemByPokemonId(props.viewHistoryItem.pokemonId));
  };

  return (
    <div
      title={getTitle(props.viewHistoryItem)}
      onClick={handleClickItem}
      key={props.viewHistoryItem.pokemonId}
      className={styles['container']}
    >
      {getTitle(props.viewHistoryItem)}
    </div>
  );
}

export default PokemonViewHistoryItem;
