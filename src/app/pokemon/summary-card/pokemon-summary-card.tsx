import { Badge, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonById, PokemonEntity, selectPokemonById } from '../state/pokemon/pokemon.slice';
import { PokedexDispatch } from '../../state/root-store';
import styles from './pokemon-summary-card.module.scss';
import { useEffect } from 'react';

export interface PokemonCardSummaryProps {
  pokemonId: number;
  pokemonName?: string;
  className?: string;
  onClick?: (pokemonId: number) => void;
}

const getAbilities = (pokemon?: PokemonEntity) => {
  if (!pokemon) {
    return '';
  }
  return (
    <div className={`${styles['abilities']}`}>
      {pokemon?.abilities?.map((item) => (
        <Badge key={item.ability.name} bg='secondary' className={styles[`badge`]}>
          {item.ability.name}
        </Badge>
      ))}
    </div>
  );
};

export function PokemonSummaryCard(props: PokemonCardSummaryProps) {
  const pokemon$ = useSelector(selectPokemonById(props.pokemonId));
  const dispatch = useDispatch<PokedexDispatch>();

  useEffect(() => {
    if (!pokemon$) {
      dispatch(fetchPokemonById(props.pokemonId));
    }
  }, [props, dispatch, pokemon$]);

  const handleCardClick = () => {
    if (props.onClick) {
      props.onClick(props.pokemonId);
    }
  };

  return (
    <Card onClick={handleCardClick} className={`${styles['container']} ${props.className}`}>
      <div className={styles['primary-image']}>
        {pokemon$?.sprites?.front_default ? <img alt={props.pokemonName} src={pokemon$?.sprites?.front_default} /> : ''}
      </div>
      <div className={`${styles['card-title']}`}>
        {`${props.pokemonName}`}
        {/*TODO: add prop to pokemon: idDisplayText*/}
        <div>{`#${props.pokemonId.toString().padStart(4, '0')}`}</div>
      </div>
      {getAbilities(pokemon$)}
    </Card>
  );
}

export default PokemonSummaryCard;
