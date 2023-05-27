import styles from './pokedex-view-history.module.scss';
import { useSelector } from 'react-redux';
import { selectAllViewHistory } from './state/view-history/view-history.slice';
import ViewHistoryItem from './view-history-item/view-history-item';
import { useEffect, useState } from 'react';

export function PokedexViewHistory() {
  const [message, setMessage] = useState('');
  const viewHistory$ = useSelector(selectAllViewHistory);

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
      {viewHistory$.map((i) => (
        <ViewHistoryItem key={i.id} viewHistoryItem={i}></ViewHistoryItem>
      ))}
      {message ? <div>{message}</div> : ''}
    </div>
  );
}

export default PokedexViewHistory;
