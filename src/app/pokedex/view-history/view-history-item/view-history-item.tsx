import styles from './view-history-item.module.scss';
import { addViewHistoryItemByPokemonId, ViewHistoryEntity } from '../state/view-history/view-history.slice';
import { pokemonIndexActions } from '../../search/state/pokemon-index/pokemon-index.slice';
import { useDispatch } from 'react-redux';
import { PokedexDispatch } from '../../../state/root-store';

export interface ViewHistoryItemProps {
  viewHistoryItem: ViewHistoryEntity;
}

export function ViewHistoryItem(props: ViewHistoryItemProps) {
  const dispatch = useDispatch<PokedexDispatch>();
  const handleClickItem = () => {
    dispatch(pokemonIndexActions.setSelectedPokemon(props.viewHistoryItem.pokemonId));
    dispatch(addViewHistoryItemByPokemonId(props.viewHistoryItem.pokemonId));
  };

  return (
    <div onClick={handleClickItem} key={props.viewHistoryItem.pokemonId} className={styles['container']}>
      {`${props.viewHistoryItem.name} #${props.viewHistoryItem.pokemonId.toString().padStart(4, '0')}`}
    </div>
  );
}

export default ViewHistoryItem;
