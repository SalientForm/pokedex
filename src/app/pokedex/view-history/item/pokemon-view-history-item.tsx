import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchPokemonByIdQuery } from '../../../pokemon/state/pokemon/pokemon.service';
import { selectPokemonFromIndexByName } from '../../state/pokemon-index/pokemon-index.slice';
import { PokemonViewHistoryEntity } from '../../state/pokemon-view-history/pokemon-view-history.slice';
import styles from './pokemon-view-history-item.module.scss';

export interface ViewHistoryItemProps {
  viewHistoryItem: PokemonViewHistoryEntity;
  onClick: (viewHistoryItem: PokemonViewHistoryEntity) => void;
}

const getTitle = (viewHistoryItem: PokemonViewHistoryEntity) =>
  `${viewHistoryItem.name} #${viewHistoryItem.pokemonId.toString().padStart(4, '0')}`;

export function PokemonViewHistoryItem(props: ViewHistoryItemProps) {
  const {
    data: pokemon$,
    error: pokemon$Error,
    isLoading: pokemon$IsLoading,
  } = useFetchPokemonByIdQuery(props.viewHistoryItem.pokemonId);

  const [backgroundStyle, setBackgroundStyle] = useState<Record<string, string>>({ background: 'none' });

  useEffect(() => {
    const backgroundImage = pokemon$?.sprites?.front_default;
    setBackgroundStyle({
      backgroundImage: `url("${backgroundImage}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top -20px right -15px'
    });
  }, [pokemon$]);

  return (
    <div
      onClick={() => props.onClick(props.viewHistoryItem)}
      title={getTitle(props.viewHistoryItem)}
      key={props.viewHistoryItem.pokemonId}
      className={styles['container']}
    >
      <div className={styles['text']}>{getTitle(props.viewHistoryItem)}</div>
      <div className={styles['container-background']} style={backgroundStyle}></div>
    </div>
  );
}

export default PokemonViewHistoryItem;
