import styles from './pokedex-view-history.module.scss';
import { useSelector } from 'react-redux';
import {
  PokemonViewHistoryEntity,
  selectAllPokemonViewHistory,
} from '../state/pokemon-view-history/pokemon-view-history.slice';
import PokemonViewHistoryItem from './item/pokemon-view-history-item';
import { useEffect, useState } from 'react';

export function PokedexViewHistory(props: {
  onClickViewHistoryItem: (viewHistoryItem: PokemonViewHistoryEntity) => void;
}) {
  const [message, setMessage] = useState('');
  const viewHistory$ = useSelector(selectAllPokemonViewHistory);

  useEffect(() => {
    switch (viewHistory$?.length) {
      case 0:
        setMessage('(No history available.)');
        break;
      default:
        setMessage('');
    }
  }, [viewHistory$]);

  // TODO: create selector that gets desired data and in correct order
  return (
    <div className={styles['container']}>
      <div className={styles['title']}>View History</div>
      <div className={styles['historyItems']}>
        {viewHistory$.map((i) => (
          <PokemonViewHistoryItem
            key={i.id}
            onClick={props.onClickViewHistoryItem}
            viewHistoryItem={i}
          ></PokemonViewHistoryItem>
        ))}
        {message ? <div className={'pt-2'}>{message}</div> : ''}
      </div>
    </div>
  );
}

export default PokedexViewHistory;
